from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from app.models import Claim, Purchase, Benefit
from ..serializers import ClaimSerializer
from app.services.claims.manager import ClaimService

class ClaimViewSet(viewsets.ModelViewSet):
    serializer_class = ClaimSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self.request.user, 'role', '') == 'Admin':
            return Claim.objects.select_related('user', 'purchase', 'benefit').all().order_by('-created_at')
        return Claim.objects.select_related('purchase', 'benefit').filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        purchase_id = request.data.get('purchase_id')
        benefit_id = request.data.get('benefit_id')
        
        if not purchase_id or not benefit_id:
            return Response({'error': 'purchase_id and benefit_id are required'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            purchase = Purchase.objects.get(id=purchase_id, user=request.user)
            benefit = Benefit.objects.get(id=benefit_id)
        except (Purchase.DoesNotExist, Benefit.DoesNotExist):
            return Response({'error': 'Invalid purchase or benefit'}, status=status.HTTP_404_NOT_FOUND)

        claim = ClaimService.create_claim(request.user, purchase, benefit)
        serializer = self.get_serializer(claim)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        claim = self.get_object()
        try:
            claim = ClaimService.submit_claim(claim)
            serializer = self.get_serializer(claim)
            return Response(serializer.data)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
