from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet  # Adjust based on your views

router = DefaultRouter()
router.register(r'blog', BlogViewSet, basename='blog')

app_name = 'blog'

urlpatterns = [
    path('', include(router.urls)),
]