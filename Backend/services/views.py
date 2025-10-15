from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Service, ServiceFeature
from .serializers import (
    ServiceListSerializer,
    ServiceDetailSerializer,
    ServiceCreateUpdateSerializer,
)


@extend_schema_view(
    list=extend_schema(description="Get list of all services"),
    retrieve=extend_schema(description="Get detailed service information"),
    create=extend_schema(description="Create a new service"),
    update=extend_schema(description="Update a service"),
    partial_update=extend_schema(description="Partially update a service"),
    destroy=extend_schema(description="Delete a service"),
)
class ServiceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing services.
    
    Provides CRUD operations for services with filtering, searching, and ordering.
    """
    queryset = Service.objects.prefetch_related('features').all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['featured', 'is_active']
    search_fields = ['name', 'description', 'features__feature']
    ordering_fields = ['created_at', 'name', 'order']
    ordering = ['order', 'name']

    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return ServiceListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ServiceCreateUpdateSerializer
        return ServiceDetailSerializer

    @extend_schema(
        description="Get only featured services",
        responses={200: ServiceListSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get only featured services"""
        services = self.queryset.filter(featured=True, is_active=True)
        serializer = ServiceListSerializer(services, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Get only active services",
        responses={200: ServiceListSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get only active services"""
        services = self.queryset.filter(is_active=True)
        serializer = ServiceListSerializer(services, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Soft delete by default, hard delete with ?hard=true"""
        instance = self.get_object()
        
        # Check if hard delete is requested
        if request.query_params.get('hard') == 'true':
            instance.delete()  # Actually delete from DB
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # Soft delete
            instance.is_active = False
            instance.save()
            return Response(
                {"message": "Service deactivated successfully"}, 
                status=status.HTTP_200_OK
            )