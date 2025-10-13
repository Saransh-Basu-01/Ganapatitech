from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend

from .models import Project, ProjectCategory, Technology, ProjectImage
from .serializers import (
    ProjectListSerializer, ProjectDetailSerializer, ProjectCreateUpdateSerializer,
    ProjectCategorySerializer, TechnologySerializer, ProjectImageSerializer
)


class ProjectCategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for project categories"""
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class TechnologyViewSet(viewsets.ModelViewSet):
    """ViewSet for technologies"""
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for projects"""
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'category', 'technologies', 'is_featured']
    search_fields = ['title', 'short_description', 'description', 'client_name']
    ordering_fields = ['order', 'completed_date', 'created_at', 'views_count']
    
    def get_queryset(self):
        queryset = Project.objects.select_related('category').prefetch_related('technologies', 'gallery_images')
        
        # Show only published projects to non-authenticated users
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(status='published')
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return ProjectCreateUpdateSerializer
        return ProjectDetailSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects"""
        featured_projects = self.get_queryset().filter(is_featured=True)
        serializer = ProjectListSerializer(featured_projects, many=True)
        return Response(serializer.data)


class ProjectImageViewSet(viewsets.ModelViewSet):
    """ViewSet for project gallery images"""
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['project']
    ordering_fields = ['order', 'created_at']