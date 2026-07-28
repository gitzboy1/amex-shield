from rest_framework import viewsets, permissions
from app.models import Purchase, Benefit
from ..serializers import PurchaseSerializer, BenefitSerializer

class PurchaseViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Admins see all, regular users see only their own
        if getattr(self.request.user, 'role', '') == 'Admin':
            return Purchase.objects.prefetch_related('benefits__benefit').all().order_by('-purchase_date')
        return Purchase.objects.prefetch_related('benefits__benefit').filter(user=self.request.user).order_by('-purchase_date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BenefitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Benefit.objects.filter(is_active=True)
    serializer_class = BenefitSerializer
    permission_classes = [permissions.IsAuthenticated]
