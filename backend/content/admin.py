from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import NavigationLink, SiteConfiguration, SocialLink, ThemeSettings


class SingletonAdmin(admin.ModelAdmin):
	"""Ensure singleton models are edited via a single change form."""

	def has_add_permission(self, request):  # pragma: no cover - admin hook
		return not self.model.objects.exists()

	def has_delete_permission(self, request, obj=None):  # pragma: no cover
		return False

	def changelist_view(self, request, extra_context=None):  # pragma: no cover
		obj = self.model.load()
		return HttpResponseRedirect(
			reverse(
				f"admin:{self.model._meta.app_label}_{self.model._meta.model_name}_change",
				args=(obj.pk,),
			)
		)


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(SingletonAdmin):
	fieldsets = (
		("Branding", {"fields": ("site_name", "logo", "tagline", "featured_video_heading")}),
		("Footer", {"fields": ("footer_text",)}),
	)


@admin.register(ThemeSettings)
class ThemeSettingsAdmin(SingletonAdmin):
	fieldsets = (
		("Light Mode", {
			"fields": (
				"light_background",
				"light_surface",
				"light_text",
				"light_accent",
			)
		}),
		("Dark Mode", {
			"fields": (
				"dark_background",
				"dark_surface",
				"dark_text",
				"dark_accent",
			)
		}),
		("Defaults", {"fields": ("default_mode",)}),
	)


@admin.register(NavigationLink)
class NavigationLinkAdmin(admin.ModelAdmin):
	list_display = ("label", "url", "order")
	list_editable = ("order",)
	search_fields = ("label", "url")
	ordering = ("order",)


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
	list_display = ("platform", "url", "icon", "order")
	list_editable = ("order",)
	search_fields = ("platform", "url")
	ordering = ("order",)
