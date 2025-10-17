from django.urls import path

from .views import HomePageView

app_name = "content"

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
]
