from rest_framework import serializers
from .models import Blog, BlogCategory, Tag
from django.contrib.auth import get_user_model

User = get_user_model()


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer for blog author information"""
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
        read_only_fields = fields


class BlogCategorySerializer(serializers.ModelSerializer):
    blog_count = serializers.IntegerField(source='blogs.count', read_only=True)
    
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'blog_count']
        read_only_fields = ['slug']


class TagSerializer(serializers.ModelSerializer):
    blog_count = serializers.IntegerField(source='blogs.count', read_only=True)
    
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug', 'blog_count']
        read_only_fields = ['slug']


class BlogListSerializer(serializers.ModelSerializer):
    """Lighter serializer for list views"""
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    
    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'tags',
            'image',
            'author',
            'featured',
            'is_published',
            'created_at',
            'updated_at'
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail views"""
    category = BlogCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=BlogCategory.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        many=True,
        required=False
    )
    author = AuthorSerializer(read_only=True)
    
    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'category_id',
            'tags',
            'tag_ids',
            'content',
            'image',
            'author',
            'featured',
            'is_published',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['slug', 'author', 'created_at', 'updated_at']
    
    def validate_title(self, value):
        """Ensure title is not just whitespace"""
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty or just whitespace.")
        return value.strip()
    
    def validate_content(self, value):
        """Ensure content is not just whitespace"""
        if not value.strip():
            raise serializers.ValidationError("Content cannot be empty or just whitespace.")
        return value.strip()


# Backward compatibility - use BlogDetailSerializer as default
BlogSerializer = BlogDetailSerializer