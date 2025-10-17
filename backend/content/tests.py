from django.test import TestCase
from django.urls import reverse

from content.models import SiteConfiguration, ThemeSettings


class HomePageViewTests(TestCase):
	def setUp(self):
		SiteConfiguration.load()
		ThemeSettings.load()

	def test_home_page_returns_ok(self):
		response = self.client.get(reverse("content:home"))
		self.assertEqual(response.status_code, 200)
		self.assertContains(response, "Adzora")
