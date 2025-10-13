from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Service
from .serializers import ServiceSerializer

# class ServiceCategoryViewSet(viewsets.ModelViewSet):
#     queryset = ServiceCategory.objects.all()
#     serializer_class = ServiceCategorySerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['name', 'description']

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['featured']  # Async filtering
    search_fields = ['name', 'description']
    ordering_fields = ['created_at']
    ordering = ['created_at']
