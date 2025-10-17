import shutil
import tempfile

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse

from content.models import NavigationLink, SiteConfiguration, SocialLink, ThemeSettings
from media_library.models import Category, ImageAsset, Tag, Video


class HomePageAPITests(TestCase):
	def setUp(self):
		self.tmp_media = tempfile.mkdtemp()
		self.addCleanup(lambda: shutil.rmtree(self.tmp_media, ignore_errors=True))
		self.override = self.settings(MEDIA_ROOT=self.tmp_media)
		self.override.enable()
		self.addCleanup(self.override.disable)

		SiteConfiguration.load()
		ThemeSettings.load()
		NavigationLink.objects.create(label="Home", url="/", order=0)
		SocialLink.objects.create(platform="Instagram", url="https://example.com", order=0)

		category = Category.objects.create(name="Posters")
		Video.objects.create(
			title="Intro",
			description="",
			category=category,
			embed_url="https://www.youtube.com/embed/dQw4w9WgXcQ",
			featured=True,
		)
		image_file = SimpleUploadedFile(
			"poster.jpg",
			(
				b"\x47\x49\x46\x38\x39\x61\x02\x00\x02\x00\x80\x00\x00\xff\xff\xff\x00\x00"
				b"\x00!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x02\x00\x02\x00\x00\x02"
				b"\x02D\x01\x00;"
			),
			content_type="image/gif",
		)
		asset = ImageAsset.objects.create(title="Poster", file=image_file, category=category)
		tag = Tag.objects.create(name="Branding")
		asset.tags.add(tag)

	def test_homepage_endpoint_returns_payload(self):
		response = self.client.get(reverse("api:homepage"))
		self.assertEqual(response.status_code, 200)
		payload = response.json()
		self.assertIn("site", payload)
		self.assertIn("theme", payload)
		self.assertIn("navigation", payload)
		self.assertTrue(payload["featured_video"])  # Should include serialized video


class VideoListAPITests(TestCase):
	def setUp(self):
		category = Category.objects.create(name="Motion")
		SiteConfiguration.load()
		ThemeSettings.load()
		Video.objects.create(
			title="Featured",
			category=category,
			embed_url="https://www.youtube.com/embed/dQw4w9WgXcQ",
			featured=True,
		)
		Video.objects.create(
			title="Regular",
			category=category,
			embed_url="https://www.youtube.com/embed/dQw4w9WgXcQ",
			featured=False,
		)

	def test_can_filter_featured_videos(self):
		response = self.client.get(reverse("api:videos"), {"featured": "true"})
		self.assertEqual(response.status_code, 200)
		items = response.json()
		self.assertEqual(len(items), 1)
		self.assertTrue(items[0]["featured"])
