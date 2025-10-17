from __future__ import annotations

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import NavigationLink, SiteConfiguration, SocialLink, ThemeSettings
from media_library.models import ImageAsset, Video

from .serializers import (
	ImageAssetSerializer,
	NavigationLinkSerializer,
	SiteConfigurationSerializer,
	SocialLinkSerializer,
	ThemeSettingsSerializer,
	VideoSerializer,
)


class HomePageAPIView(APIView):
	"""Aggregate payload used by the standalone frontend."""

	def get(self, request, *args, **kwargs):
		site_config = SiteConfiguration.load()
		theme = ThemeSettings.load()

		featured_video = (
			Video.objects.select_related("category")
			.filter(featured=True)
			.order_by("title")
			.first()
		)
		if featured_video is None:
			featured_video = (
				Video.objects.select_related("category")
				.order_by("-created_at")
				.first()
			)

		gallery_queryset = (
			ImageAsset.objects.select_related("category")
			.prefetch_related("tags")
			.order_by("-featured", "-created_at")[:12]
		)

		payload = {
			"site": SiteConfigurationSerializer(site_config, context={"request": request}).data,
			"theme": ThemeSettingsSerializer(theme, context={"request": request}).data,
			"navigation": NavigationLinkSerializer(
				NavigationLink.objects.all(), many=True, context={"request": request}
			).data,
			"social": SocialLinkSerializer(
				SocialLink.objects.all(), many=True, context={"request": request}
			).data,
			"featured_video": (
				VideoSerializer(featured_video, context={"request": request}).data
				if featured_video
				else None
			),
			"gallery": ImageAssetSerializer(
				gallery_queryset, many=True, context={"request": request}
			).data,
		}
		return Response(payload, status=status.HTTP_200_OK)


class VideoListAPIView(generics.ListAPIView):
	serializer_class = VideoSerializer

	def get_queryset(self):
		queryset = Video.objects.select_related("category").order_by("-featured", "-created_at")
		featured = self.request.query_params.get("featured")
		category_slug = self.request.query_params.get("category")

		if featured in {"1", "true", "True"}:
			queryset = queryset.filter(featured=True)
		if category_slug:
			queryset = queryset.filter(category__slug=category_slug)
		return queryset


class GalleryListAPIView(generics.ListAPIView):
	serializer_class = ImageAssetSerializer

	def get_queryset(self):
		queryset = (
			ImageAsset.objects.select_related("category")
			.prefetch_related("tags")
			.order_by("-featured", "-created_at")
		)
		category_slug = self.request.query_params.get("category")
		tag_name = self.request.query_params.get("tag")

		if category_slug:
			queryset = queryset.filter(category__slug=category_slug)
		if tag_name:
			queryset = queryset.filter(tags__name__iexact=tag_name)
		return queryset.distinct()
