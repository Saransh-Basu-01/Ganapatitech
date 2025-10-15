from rest_framework import serializers
from .models import Service, ServiceFeature

class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['id', 'feature', 'order']
        read_only_fields = ['id']


class ServiceListSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    """Lightweight serializer for list views"""
    features_count = serializers.IntegerField(
        source='features.count',
        read_only=True
    )
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'image', 'featured',
            'is_active', 'order', 'features_count','features',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ServiceDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer with nested features"""
    features = ServiceFeatureSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'description', 'image',
            'featured', 'is_active', 'order', 'features',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def validate_name(self, value):
        """Ensure service name is unique (case-insensitive)"""
        if Service.objects.filter(name__iexact=value).exists():
            if not self.instance or self.instance.name.lower() != value.lower():
                raise serializers.ValidationError(
                    "A service with this name already exists."
                )
        return value


class ServiceCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating services with features"""
    features = ServiceFeatureSerializer(many=True, required=False)
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'slug', 'description', 'image',
            'featured', 'is_active', 'order', 'features'
        ]
        read_only_fields = ['id', 'slug']

    def create(self, validated_data):
        features_data = validated_data.pop('features', [])
        service = Service.objects.create(**validated_data)
        
        for feature_data in features_data:
            ServiceFeature.objects.create(service=service, **feature_data)
        
        return service

    def update(self, instance, validated_data):
        features_data = validated_data.pop('features', None)
        
        # Update service fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update features if provided
        if features_data is not None:
            instance.features.all().delete()
            for feature_data in features_data:
                ServiceFeature.objects.create(service=instance, **feature_data)
        
        return instance