from rest_framework import serializers
from .models import Project, ProjectCategory, Technology, ProjectImage


class ProjectCategorySerializer(serializers.ModelSerializer):
    projects_count = serializers.IntegerField(source='projects.count', read_only=True)
    
    class Meta:
        model = ProjectCategory
        fields = ['id', 'name', 'slug', 'description', 'icon', 'projects_count', 'created_at']
        read_only_fields = ['slug']


class TechnologySerializer(serializers.ModelSerializer):
    projects_count = serializers.IntegerField(source='projects.count', read_only=True)
    
    class Meta:
        model = Technology
        fields = ['id', 'name', 'slug', 'icon', 'color', 'projects_count', 'created_at']
        read_only_fields = ['slug']


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer for project list view"""
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'client_name', 'category', 'technologies',
            'short_description', 'featured_image', 'project_url',
            'is_featured', 'views_count', 'completed_date', 'created_at'
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for project detail view"""
    category = ProjectCategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    gallery_images = ProjectImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'client_name', 'category', 'technologies',
            'short_description', 'description', 'case_study',
            'featured_image', 'gallery_images', 'project_url', 'github_url',
            'metrics', 'is_featured', 'views_count',
            'completed_date', 'created_at', 'updated_at'
        ]


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating projects"""
    
    class Meta:
        model = Project
        fields = [
            'title', 'client_name', 'category', 'technologies',
            'short_description', 'description', 'case_study',
            'featured_image', 'project_url', 'github_url',
            'metrics', 'status', 'is_featured', 'order', 'completed_date'
        ]
    
    def create(self, validated_data):
        technologies = validated_data.pop('technologies', [])
        project = Project.objects.create(**validated_data)
        project.technologies.set(technologies)
        return project
    
    def update(self, instance, validated_data):
        technologies = validated_data.pop('technologies', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if technologies is not None:
            instance.technologies.set(technologies)
        
        return instance