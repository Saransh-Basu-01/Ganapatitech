from rest_framework import viewsets
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from rest_framework.permissions import IsAdminUser, AllowAny

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]  # admin-only
        else:
            permission_classes = [AllowAny]  # anyone can submit
        return [permission() for permission in permission_classes]
