from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfolioViewSet, PortfolioCategoryViewSet, TechnologyViewSet

router = DefaultRouter()
router.register(r'portfolio', PortfolioViewSet, basename='portfolio')
router.register(r'portfolio-categories', PortfolioCategoryViewSet, basename='portfolio-category')
router.register(r'technologies', TechnologyViewSet, basename='technology')

app_name = 'portfolio'

urlpatterns = [
    path('', include(router.urls)),
]