from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Portfolio, PortfolioCategory, Technology
from .serializers import (
    PortfolioListSerializer,
    PortfolioDetailSerializer,
    PortfolioCreateUpdateSerializer,
    PortfolioCategorySerializer,
    TechnologySerializer,
)


@extend_schema_view(
    list=extend_schema(description="Get list of portfolio categories"),
    retrieve=extend_schema(description="Get category details"),
    create=extend_schema(description="Create new category (Admin only)"),
    update=extend_schema(description="Update category (Admin only)"),
    destroy=extend_schema(description="Delete category (Admin only)"),
)
class PortfolioCategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for portfolio categories"""
    queryset = PortfolioCategory.objects.all()
    serializer_class = PortfolioCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['order', 'name', 'created_at']
    ordering = ['order', 'name']
    lookup_field = 'slug'

    @extend_schema(description="Get active categories")
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get only active categories"""
        categories = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)


@extend_schema_view(
    list=extend_schema(description="Get list of technologies"),
    retrieve=extend_schema(description="Get technology details"),
    create=extend_schema(description="Create new technology (Admin only)"),
)
class TechnologyViewSet(viewsets.ModelViewSet):
    """ViewSet for technologies"""
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering = ['name']
    lookup_field = 'slug'


@extend_schema_view(
    list=extend_schema(description="Get list of portfolio projects"),
    retrieve=extend_schema(description="Get project details"),
    create=extend_schema(description="Create new project (Admin only)"),
    update=extend_schema(description="Update project (Admin only)"),
    destroy=extend_schema(description="Delete project (Admin only)"),
)
class PortfolioViewSet(viewsets.ModelViewSet):
    """ViewSet for portfolio projects"""
    queryset = Portfolio.objects.prefetch_related(
        'technologies', 'category', 'gallery_images'
    ).all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured', 'is_published', 'technologies']
    search_fields = ['title', 'description', 'client', 'technologies__name']
    ordering_fields = ['completion_date', 'created_at', 'order', 'view_count']
    ordering = ['-featured', 'order', '-completion_date']
    lookup_field = 'slug'

    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return PortfolioListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PortfolioCreateUpdateSerializer
        return PortfolioDetailSerializer

    def get_queryset(self):
        """Filter published projects for non-staff users"""
        queryset = super().get_queryset()
        
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_published=True)
        
        return queryset

    def retrieve(self, request, *args, **kwargs):
        """Retrieve and increment view count"""
        instance = self.get_object()
        
        # Increment view count (only for non-staff)
        if not request.user.is_staff:
            instance.increment_view_count()
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @extend_schema(
        description="Get featured portfolio projects",
        responses={200: PortfolioListSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get only featured projects"""
        projects = self.get_queryset().filter(featured=True, is_published=True)
        serializer = PortfolioListSerializer(projects, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Get projects by category",
        responses={200: PortfolioListSerializer(many=True)}
    )
    @action(detail=False, methods=['get'], url_path='category/(?P<category_slug>[^/.]+)')
    def by_category(self, request, category_slug=None):
        """Get projects by category slug"""
        projects = self.get_queryset().filter(
            category__slug=category_slug,
            is_published=True
        )
        serializer = PortfolioListSerializer(projects, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Get projects by technology",
        responses={200: PortfolioListSerializer(many=True)}
    )
    @action(detail=False, methods=['get'], url_path='technology/(?P<tech_slug>[^/.]+)')
    def by_technology(self, request, tech_slug=None):
        """Get projects by technology slug"""
        projects = self.get_queryset().filter(
            technologies__slug=tech_slug,
            is_published=True
        )
        serializer = PortfolioListSerializer(projects, many=True)
        return Response(serializer.data)

    @extend_schema(
        description="Get portfolio statistics",
        responses={200: {
            'type': 'object',
            'properties': {
                'total': {'type': 'integer'},
                'published': {'type': 'integer'},
                'featured': {'type': 'integer'},
                'by_category': {'type': 'object'},
            }
        }}
    )
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get portfolio statistics"""
        queryset = self.get_queryset()
        
        stats = {
            'total': queryset.count(),
            'published': queryset.filter(is_published=True).count(),
            'featured': queryset.filter(featured=True, is_published=True).count(),
            'by_category': {},
            'total_views': sum(queryset.values_list('view_count', flat=True)),
        }
        
        # Projects per category
        for category in PortfolioCategory.objects.all():
            count = queryset.filter(category=category, is_published=True).count()
            if count > 0:
                stats['by_category'][category.name] = count
        
        return Response(stats)