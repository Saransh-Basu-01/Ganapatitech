from rest_framework import serializers
from .models import Portfolio, PortfolioCategory, Technology, PortfolioImage


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name', 'slug', 'icon', 'color']


class PortfolioCategorySerializer(serializers.ModelSerializer):
    projects_count = serializers.IntegerField(
        source='portfolios.count',
        read_only=True
    )
    
    class Meta:
        model = PortfolioCategory
        fields = [
            'id', 'name', 'slug', 'description', 'icon',
            'order', 'is_active', 'projects_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ['id', 'image', 'caption', 'order']


class PortfolioListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    category = PortfolioCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    
    class Meta:
        model = Portfolio
        fields = [
            'id', 'title', 'slug', 'short_description',
            'category', 'technologies', 'thumbnail', 'image',
            'client', 'completion_date', 'featured',
            'is_published', 'view_count', 'created_at'
        ]


class PortfolioDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with all information"""
    category = PortfolioCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    gallery_images = PortfolioImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Portfolio
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'category', 'technologies', 'client', 'project_url',
            'github_url', 'demo_link', 'start_date', 'completion_date',
            'image', 'thumbnail', 'gallery_images', 'featured',
            'is_published', 'order', 'view_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'view_count', 'created_at', 'updated_at']


class PortfolioCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating portfolios"""
    technology_ids = serializers.PrimaryKeyRelatedField(
        queryset=Technology.objects.all(),
        many=True,
        source='technologies',
        required=False
    )
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=PortfolioCategory.objects.all(),
        source='category',
        write_only=True
    )
    
    class Meta:
        model = Portfolio
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'category_id', 'technology_ids', 'client', 'project_url',
            'github_url', 'demo_link', 'start_date', 'completion_date',
            'image', 'thumbnail', 'featured', 'is_published', 'order'
        ]
        read_only_fields = ['id', 'slug']
    
    def validate(self, data):
        """Custom validation"""
        if data.get('start_date') and data.get('completion_date'):
            if data['start_date'] > data['completion_date']:
                raise serializers.ValidationError(
                    "Start date cannot be after completion date"
                )
        return data