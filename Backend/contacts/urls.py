from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet, ContactConfigurationViewSet

router = DefaultRouter()
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'contact-config', ContactConfigurationViewSet, basename='contact-config')

app_name = 'contacts'

urlpatterns = [
    path('', include(router.urls)),
]
