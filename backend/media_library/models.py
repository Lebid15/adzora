from __future__ import annotations

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
	name = models.CharField(max_length=120, unique=True)
	slug = models.SlugField(max_length=140, unique=True, blank=True)

	class Meta:
		ordering = ["name"]

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.name

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.name)
		super().save(*args, **kwargs)


class Tag(models.Model):
	name = models.CharField(max_length=50, unique=True)

	class Meta:
		ordering = ["name"]

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.name


class Video(models.Model):
	title = models.CharField(max_length=160)
	description = models.TextField(blank=True)
	thumbnail = models.ImageField(upload_to="media_library/video_thumbnails/", blank=True, null=True)
	embed_url = models.URLField(blank=True)
	video_file = models.FileField(upload_to="media_library/videos/", blank=True)
	category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
	featured = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ["-featured", "title"]

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.title

	def clean(self):
		super().clean()
		if not self.embed_url and not self.video_file:
			raise ValidationError("Provide either a video file or an embed URL.")

	def save(self, *args, **kwargs):
		if self.featured:
			Video.objects.filter(featured=True).exclude(pk=self.pk).update(featured=False)
		super().save(*args, **kwargs)


class ImageAsset(models.Model):
	title = models.CharField(max_length=160)
	file = models.ImageField(upload_to="media_library/images/")
	category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
	tags = models.ManyToManyField(Tag, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	featured = models.BooleanField(default=False)

	class Meta:
		ordering = ["-featured", "-created_at"]

	def __str__(self) -> str:  # pragma: no cover - admin display only
		return self.title
