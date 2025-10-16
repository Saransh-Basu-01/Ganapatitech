from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Blog, BlogCategory, Tag
from .serializers import (
    BlogListSerializer, 
    BlogDetailSerializer,
    BlogCategorySerializer, 
    TagSerializer
)
from .permission import IsAuthorOrReadOnly, IsOwnerOrReadOnly


class BlogViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Blog operations.
    
    list: Get all published blogs
    retrieve: Get a single blog by ID or slug
    create: Create a new blog (authenticated users only)
    update/partial_update: Update a blog (author only)
    destroy: Delete a blog (author only)
    """
    queryset = Blog.objects.select_related('category', 'author').prefetch_related('tags').all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'author__username']
    filterset_fields = ['category', 'tags', 'featured', 'is_published', 'author']
    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']
    lookup_field = 'slug'
    
    def get_queryset(self):
        """Filter published posts for non-staff users"""
        queryset = super().get_queryset()
        
        # Staff and superusers can see all posts
        if self.request.user and self.request.user.is_staff:
            return queryset
        
        # Regular users only see published posts (and their own drafts)
        if self.request.user and self.request.user.is_authenticated:
            return queryset.filter(
                models.Q(is_published=True) | models.Q(author=self.request.user)
            )
        
        # Anonymous users only see published posts
        return queryset.filter(is_published=True)
    
    def get_serializer_class(self):
        """Use lighter serializer for list views"""
        if self.action == 'list':
            return BlogListSerializer
        return BlogDetailSerializer
    
    def perform_create(self, serializer):
        """Set the author to the current user"""
        serializer.save(author=self.request.user)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured blog posts"""
        featured_blogs = self.get_queryset().filter(featured=True, is_published=True)
        serializer = self.get_serializer(featured_blogs, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def my_blogs(self, request):
        """Get blogs by the current user"""
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication required.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        my_blogs = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(my_blogs, many=True)
        return Response(serializer.data)


class BlogCategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for BlogCategory operations.
    Only staff can create/update/delete categories.
    """
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering = ['name']
    lookup_field = 'slug'


class TagViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Tag operations.
    Only staff can create/update/delete tags.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsOwnerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering = ['name']
    lookup_field = 'slug'