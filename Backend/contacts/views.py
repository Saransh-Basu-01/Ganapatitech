from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from drf_spectacular.utils import extend_schema, extend_schema_view
from django.utils import timezone
from .models import ContactMessage, ContactConfiguration
from .serializers import (
    ContactMessageCreateSerializer,
    ContactMessageListSerializer,
    ContactMessageDetailSerializer,
    ContactMessageReplySerializer,
    ContactConfigurationSerializer,
)
from .services import ContactEmailService
import logging

logger = logging.getLogger(__name__)


def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@extend_schema_view(
    list=extend_schema(description="Get all contact messages (Admin only)"),
    retrieve=extend_schema(description="Get specific contact message (Admin only)"),
    create=extend_schema(description="Submit a new contact form message"),
    update=extend_schema(description="Update contact message (Admin only)"),
    partial_update=extend_schema(description="Partially update contact message (Admin only)"),
    destroy=extend_schema(description="Delete contact message (Admin only)"),
)
class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact messages.
    
    Public endpoint: POST /api/contact/ - Submit contact form
    Admin endpoints: All other CRUD operations
    """
    queryset = ContactMessage.objects.all().order_by('-created_at')
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'read', 'email_sent']
    search_fields = ['name', 'email', 'subject', 'message']
    ordering_fields = ['created_at', 'updated_at', 'status']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'create':
            return ContactMessageCreateSerializer
        elif self.action == 'list':
            return ContactMessageListSerializer
        elif self.action == 'reply':
            return ContactMessageReplySerializer
        return ContactMessageDetailSerializer

    def get_permissions(self):
        """
        Allow anyone to create (submit contact form)
        Only admins can view/edit/delete
        """
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        """Create new contact message and send notifications"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save with IP address and user agent
        contact_message = serializer.save(
            ip_address=get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')[:500]
        )
        
        # Send email notifications
        try:
            # Send notification to admin
            ContactEmailService.send_admin_notification(contact_message)
            
            # Send confirmation to user
            ContactEmailService.send_confirmation_to_user(contact_message)
            
            logger.info(f"Contact message #{contact_message.id} created and notifications sent")
        except Exception as e:
            logger.error(f"Error sending notifications for contact message #{contact_message.id}: {str(e)}")
        
        return Response(
            {
                'message': 'Thank you for your message. We will get back to you soon!',
                'id': contact_message.id
            },
            status=status.HTTP_201_CREATED
        )

    def retrieve(self, request, *args, **kwargs):
        """Retrieve and mark message as read"""
        instance = self.get_object()
        instance.mark_as_read()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @extend_schema(
        description="Mark contact message(s) as read",
        request=None,
        responses={200: {'type': 'object', 'properties': {'message': {'type': 'string'}}}}
    )
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Mark a specific message as read"""
        message = self.get_object()
        message.mark_as_read()
        return Response({'message': 'Message marked as read'})

    @extend_schema(
        description="Mark contact message(s) as unread",
        request=None,
        responses={200: {'type': 'object', 'properties': {'message': {'type': 'string'}}}}
    )
    @action(detail=True, methods=['post'])
    def mark_unread(self, request, pk=None):
        """Mark a specific message as unread"""
        message = self.get_object()
        message.read = False
        message.status = 'new'
        message.save(update_fields=['read', 'status', 'updated_at'])
        return Response({'message': 'Message marked as unread'})

    @extend_schema(
        description="Send reply to contact message",
        request=ContactMessageReplySerializer,
        responses={200: {'type': 'object', 'properties': {'message': {'type': 'string'}}}}
    )
    @action(detail=True, methods=['post'], serializer_class=ContactMessageReplySerializer)
    def reply(self, request, pk=None):
        """Send reply to user via email"""
        message = self.get_object()
        serializer = ContactMessageReplySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Save reply
        message.admin_reply = serializer.validated_data['admin_reply']
        message.save(update_fields=['admin_reply', 'updated_at'])
        
        # Send email if requested
        if serializer.validated_data.get('send_email', True):
            success = ContactEmailService.send_reply_to_user(message)
            if success:
                message.mark_as_replied(user=request.user)
                return Response({'message': 'Reply sent successfully'})
            else:
                return Response(
                    {'error': 'Reply saved but email sending failed'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            message.mark_as_replied(user=request.user)
            return Response({'message': 'Reply saved (email not sent)'})

    @extend_schema(
        description="Resend notification email to admin",
        request=None,
        responses={200: {'type': 'object', 'properties': {'message': {'type': 'string'}}}}
    )
    @action(detail=True, methods=['post'])
    def resend_notification(self, request, pk=None):
        """Resend notification email to admin"""
        message = self.get_object()
        success = ContactEmailService.send_admin_notification(message)
        if success:
            return Response({'message': 'Notification email resent successfully'})
        else:
            return Response(
                {'error': 'Failed to send notification email. Check logs for details.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @extend_schema(
        description="Get contact statistics",
        responses={200: {
            'type': 'object',
            'properties': {
                'total': {'type': 'integer'},
                'new': {'type': 'integer'},
                'read': {'type': 'integer'},
                'replied': {'type': 'integer'},
                'archived': {'type': 'integer'},
            }
        }}
    )
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get contact message statistics"""
        queryset = self.get_queryset()
        stats = {
            'total': queryset.count(),
            'new': queryset.filter(status='new').count(),
            'read': queryset.filter(status='read').count(),
            'replied': queryset.filter(status='replied').count(),
            'archived': queryset.filter(status='archived').count(),
            'unread': queryset.filter(read=False).count(),
            'email_sent': queryset.filter(email_sent=True).count(),
            'email_failed': queryset.filter(email_sent=False).exclude(email_error='').count(),
        }
        return Response(stats)

    @extend_schema(
        description="Get new/unread messages",
        responses={200: ContactMessageListSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def unread(self, request):
        """Get only unread messages"""
        messages = self.queryset.filter(read=False)
        serializer = ContactMessageListSerializer(messages, many=True)
        return Response(serializer.data)


@extend_schema_view(
    list=extend_schema(description="Get all contact email recipients"),
    retrieve=extend_schema(description="Get specific email recipient"),
    create=extend_schema(description="Add new email recipient"),
    update=extend_schema(description="Update email recipient"),
    destroy=extend_schema(description="Delete email recipient"),
)
class ContactConfigurationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact form email recipients.
    Admin only.
    """
    queryset = ContactConfiguration.objects.all().order_by('-created_at')
    serializer_class = ContactConfigurationSerializer
    permission_classes = [IsAdminUser]

    @extend_schema(
        description="Get active email recipients",
        responses={200: ContactConfigurationSerializer(many=True)}
    )
    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get only active email recipients"""
        recipients = self.queryset.filter(is_active=True)
        serializer = self.get_serializer(recipients, many=True)
        return Response(serializer.data)