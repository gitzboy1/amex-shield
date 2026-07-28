from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from app.models import AuditLog
from app.services.analytics.engine import AnalyticsEngine
from ..serializers import UserSerializer
from rest_framework import serializers

User = get_user_model()

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'role', '') == 'Admin')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard_metrics(request):
    metrics = AnalyticsEngine.get_dashboard_metrics()
    return Response(metrics)

class AdminUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    queryset = User.objects.all().order_by('-date_joined')

class AuditLogSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = AuditLog
        fields = '__all__'

class AdminAuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AuditLogSerializer
    permission_classes = [IsAdminUser]
    queryset = AuditLog.objects.select_related('user').order_by('-created_at')
