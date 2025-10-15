from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet  # Adjust based on your views

router = DefaultRouter()
router.register(r'teams', TeamMemberViewSet, basename='team')

app_name = 'teams'

urlpatterns = [
    path('', include(router.urls)),
]
