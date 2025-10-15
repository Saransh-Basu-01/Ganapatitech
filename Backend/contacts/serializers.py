from rest_framework import serializers
from .models import ContactMessage, ContactConfiguration
from django.utils import timezone


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating contact messages (public)"""
    
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message', 'phone']
        
    def validate_email(self, value):
        """Validate email format"""
        return value.lower().strip()
    
    def validate_name(self, value):
        """Validate name"""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long")
        return value.strip()
    
    def validate_message(self, value):
        """Validate message"""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long")
        return value.strip()


class ContactMessageListSerializer(serializers.ModelSerializer):
    """Serializer for listing contact messages (admin)"""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'subject', 'phone',
            'status', 'status_display', 'read', 'email_sent',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ContactMessageDetailSerializer(serializers.ModelSerializer):
    """Serializer for detailed contact message view (admin)"""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    replied_by_username = serializers.CharField(source='replied_by.username', read_only=True)
    
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'email_sent',
            'email_sent_at', 'email_error', 'ip_address',
            'user_agent', 'replied_at', 'replied_by'
        ]


class ContactMessageReplySerializer(serializers.ModelSerializer):
    """Serializer for admin replies"""
    send_email = serializers.BooleanField(write_only=True, default=True)
    
    class Meta:
        model = ContactMessage
        fields = ['admin_reply', 'send_email']
    
    def validate_admin_reply(self, value):
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError("Reply must be at least 10 characters long")
        return value.strip()


class ContactConfigurationSerializer(serializers.ModelSerializer):
    """Serializer for contact configuration"""
    
    class Meta:
        model = ContactConfiguration
        fields = '__all__'
        read_only_fields = ['id', 'created_at']