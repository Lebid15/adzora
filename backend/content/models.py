from __future__ import annotations

from django.core.validators import RegexValidator
from django.db import models


class SingletonModel(models.Model):
	"""Simple base to enforce a single persisted row per model."""

	class Meta:
		abstract = True

	def save(self, *args, **kwargs):
		self.pk = 1
		super().save(*args, **kwargs)

	def delete(self, *args, **kwargs):  # pragma: no cover - defensive guard
		raise RuntimeError("Singleton models cannot be deleted.")

	@classmethod
	def load(cls):
		obj, _ = cls.objects.get_or_create(pk=1)
		return obj


hex_color_validator = RegexValidator(
	regex=r"^#(?:[0-9a-fA-F]{3}){1,2}$",
	message="Enter a valid hex color value (e.g. #1A1A1A).",
)


class SiteConfiguration(SingletonModel):
	site_name = models.CharField(max_length=120, default="Adzora")
	logo = models.ImageField(upload_to="branding/", blank=True, null=True)
	tagline = models.CharField(max_length=160, blank=True)
	featured_video_heading = models.CharField(
		max_length=120,
		default="Featured Showcase",
	)
	footer_text = models.CharField(
		max_length=200,
		default="© Adzora. All rights reserved.",
	)

	class Meta:
		verbose_name = "Site configuration"

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.site_name


class NavigationLink(models.Model):
	label = models.CharField(max_length=60)
	url = models.CharField(max_length=200)
	order = models.PositiveIntegerField(default=0)

	class Meta:
		ordering = ["order", "label"]

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.label


class SocialLink(models.Model):
	platform = models.CharField(max_length=60)
	url = models.URLField()
	icon = models.CharField(
		max_length=120,
		blank=True,
		help_text="Optional CSS class for the icon (e.g. fa-brands fa-instagram).",
	)
	order = models.PositiveIntegerField(default=0)

	class Meta:
		ordering = ["order", "platform"]

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.platform


class ThemeSettings(SingletonModel):
	default_mode = models.CharField(
		max_length=5,
		choices=(
			("light", "Light"),
			("dark", "Dark"),
		),
		default="light",
	)
	light_background = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#ffffff",
	)
	light_surface = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#f4f4f5",
	)
	light_text = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#1f2933",
	)
	light_accent = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#f97316",
	)
	dark_background = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#111827",
	)
	dark_surface = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#1f2937",
	)
	dark_text = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#f9fafb",
	)
	dark_accent = models.CharField(
		max_length=7,
		validators=[hex_color_validator],
		default="#38bdf8",
	)

	class Meta:
		verbose_name = "Theme settings"

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return "Theme settings"

	def as_palette(self) -> dict[str, dict[str, str]]:
		return {
			"light": {
				"background": self.light_background,
				"surface": self.light_surface,
				"text": self.light_text,
				"accent": self.light_accent,
			},
			"dark": {
				"background": self.dark_background,
				"surface": self.dark_surface,
				"text": self.dark_text,
				"accent": self.dark_accent,
			},
			"default": self.default_mode,
		}
