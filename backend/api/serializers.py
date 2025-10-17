from __future__ import annotations

from rest_framework import serializers

from content.models import NavigationLink, SiteConfiguration, SocialLink, ThemeSettings
from media_library.models import Category, ImageAsset, Tag, Video


class SiteConfigurationSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteConfiguration
        fields = (
            "site_name",
            "tagline",
            "featured_video_heading",
            "footer_text",
            "logo_url",
        )

    def get_logo_url(self, obj: SiteConfiguration) -> str | None:
        request = self.context.get("request")
        if obj.logo:
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None


class ThemeSettingsSerializer(serializers.ModelSerializer):
    palette = serializers.SerializerMethodField()

    class Meta:
        model = ThemeSettings
        fields = ("default_mode", "palette")

    def get_palette(self, obj: ThemeSettings) -> dict[str, dict[str, str]]:
        return obj.as_palette()


class NavigationLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationLink
        fields = ("label", "url", "order")


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ("platform", "url", "icon", "order")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name")


class VideoSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    thumbnail_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = (
            "id",
            "title",
            "description",
            "embed_url",
            "video_url",
            "thumbnail_url",
            "category",
            "featured",
            "created_at",
            "updated_at",
        )

    def get_thumbnail_url(self, obj: Video) -> str | None:
        request = self.context.get("request")
        if obj.thumbnail:
            if request:
                return request.build_absolute_uri(obj.thumbnail.url)
            return obj.thumbnail.url
        return None

    def get_video_url(self, obj: Video) -> str | None:
        request = self.context.get("request")
        if obj.video_file:
            if request:
                return request.build_absolute_uri(obj.video_file.url)
            return obj.video_file.url
        return None


class ImageAssetSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = ImageAsset
        fields = (
            "id",
            "title",
            "file_url",
            "category",
            "tags",
            "featured",
            "created_at",
        )

    def get_file_url(self, obj: ImageAsset) -> str:
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url
