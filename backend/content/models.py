from __future__ import annotations

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


class SiteConfiguration(SingletonModel):
	site_name = models.CharField(max_length=120, default="Adzora")
	logo = models.ImageField(upload_to="branding/", blank=True, null=True)
	tagline = models.CharField(max_length=160, blank=True)

	class Meta:
		verbose_name = "Site configuration"

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.site_name


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
