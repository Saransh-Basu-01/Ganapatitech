from rest_framework import viewsets
from .models import Review
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAdminUser, AllowAny

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]  # Admin-only for approval & delete
        else:
            permission_classes = [AllowAny]  # Anyone can submit
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        # Show only approved reviews to non-admin users
        if not self.request.user.is_staff:
            queryset = queryset.filter(approved=True)
        # Optional: filter by service id
        service_id = self.request.query_params.get('service')
        if service_id:
            queryset = queryset.filter(service_id=service_id)
        return queryset
