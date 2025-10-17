from django.contrib import admin

from .models import Category, ImageAsset, Tag, Video


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "slug")
	prepopulated_fields = {"slug": ("name",)}
	search_fields = ("name", "slug")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
	list_display = ("name",)
	search_fields = ("name",)


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
	list_display = ("title", "category", "featured", "updated_at")
	list_filter = ("featured", "category")
	search_fields = ("title", "description")
	list_editable = ("featured",)
	autocomplete_fields = ("category",)


@admin.register(ImageAsset)
class ImageAssetAdmin(admin.ModelAdmin):
	list_display = ("title", "category", "featured", "created_at")
	list_filter = ("featured", "category")
	search_fields = ("title",)
	autocomplete_fields = ("category", "tags")
	list_editable = ("featured",)
