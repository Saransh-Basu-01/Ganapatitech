from rest_framework import viewsets, filters
from .models import Blog, BlogCategory, Tag
from .serializers import BlogSerializer, BlogCategorySerializer, TagSerializer

# ---------------------------
# Blog ViewSet
# ---------------------------
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']  # Frontend can search blogs

# ---------------------------
# BlogCategory ViewSet
# ---------------------------
class BlogCategoryViewSet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    # Optional: search by name
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

# ---------------------------
# Tag ViewSet
# ---------------------------
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
