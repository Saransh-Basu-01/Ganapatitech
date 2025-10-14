from rest_framework import serializers
from .models import Service

# class ServiceCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ServiceCategory
#         fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    # category = ServiceCategorySerializer(read_only=True)
    # category_id = serializers.PrimaryKeyRelatedField(queryset=ServiceCategory.objects.all(), source='category', write_only=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'gradient', 'featured', 'created_at']
