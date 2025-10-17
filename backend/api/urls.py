from django.urls import path

from .views import GalleryListAPIView, HomePageAPIView, VideoListAPIView

app_name = "api"

urlpatterns = [
    path("homepage/", HomePageAPIView.as_view(), name="homepage"),
    path("videos/", VideoListAPIView.as_view(), name="videos"),
    path("gallery/", GalleryListAPIView.as_view(), name="gallery"),
]
