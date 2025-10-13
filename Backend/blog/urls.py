from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, BlogCategoryViewSet, TagViewSet

router = DefaultRouter()
router.register(r'blogs', BlogViewSet)
router.register(r'categories', BlogCategoryViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
