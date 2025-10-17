from __future__ import annotations

from django.views.generic import TemplateView

from media_library.models import ImageAsset, Video

from .models import SiteConfiguration, SocialLink


class HomePageView(TemplateView):
	template_name = "content/home.html"

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		site_config = SiteConfiguration.load()

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

		context.update(
			{
				"site_config": site_config,
				"social_links": SocialLink.objects.all(),
				"featured_video": featured_video,
				"gallery_items": ImageAsset.objects.select_related("category").prefetch_related(
					"tags"
				)[:8],
			}
		)
		return context
