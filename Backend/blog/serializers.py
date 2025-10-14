from rest_framework import serializers
from .models import Blog, BlogCategory, Tag

# ---------------------------
# BlogCategory Serializer
# ---------------------------
class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug']


# ---------------------------
# Tag Serializer
# ---------------------------
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


# ---------------------------
# Blog Serializer
# ---------------------------
class BlogSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'tags',
            'content',
            'image',
            'author',
            'featured',
            'created_at',
            'updated_at'
        ]
