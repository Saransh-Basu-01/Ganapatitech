from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectCategoryViewSet, TechnologyViewSet, ProjectImageViewSet

app_name = 'portfolio'

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'categories', ProjectCategoryViewSet, basename='category')
router.register(r'technologies', TechnologyViewSet, basename='technology')
router.register(r'images', ProjectImageViewSet, basename='image')

urlpatterns = [
    path('', include(router.urls)),
]