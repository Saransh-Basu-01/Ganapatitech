from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
# router.register(r'categories', ServiceCategoryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
