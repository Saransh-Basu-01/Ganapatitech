from rest_framework import viewsets
from .models import TeamMember
from .serializers import TeamMemberSerializer
from rest_framework.permissions import IsAdminUser, AllowAny

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all().order_by('name')
    serializer_class = TeamMemberSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]  # Anyone can view
        else:
            permission_classes = [IsAdminUser]  # Only admin can create/update/delete
        return [permission() for permission in permission_classes]
