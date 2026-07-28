from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from django.utils import timezone
import datetime
from app.models import Purchase, PurchaseBenefit

class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        purchases = Purchase.objects.filter(user=user)
        
        total_purchases = purchases.count()
        
        protected_purchases = purchases.filter(benefits__is_activated=True).distinct().count()
        
        total_protected_value = purchases.filter(benefits__is_activated=True).aggregate(Sum('amount'))['amount__sum'] or 0
        
        active_benefits = PurchaseBenefit.objects.filter(purchase__user=user, is_activated=True).values('benefit').distinct().count()
        
        now = timezone.now().date()
        fourteen_days_from_now = now + datetime.timedelta(days=14)
        expiring_soon = PurchaseBenefit.objects.filter(
            purchase__user=user, 
            is_activated=True,
            expiration_date__lte=fourteen_days_from_now,
            expiration_date__gte=now
        ).count()

        claims_filed = PurchaseBenefit.objects.filter(
            purchase__user=user,
            claim_status__in=['Filed', 'Approved', 'Denied']
        ).count()

        return Response({
            'total_purchases': total_purchases,
            'protected_purchases': protected_purchases,
            'total_protected_value': total_protected_value,
            'active_benefits': active_benefits,
            'expiring_soon': expiring_soon,
            'claims_filed': claims_filed
        })

class DashboardUpcomingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now().date()
        upcoming = PurchaseBenefit.objects.filter(
            purchase__user=user,
            is_activated=True,
            expiration_date__gte=now
        ).order_by('expiration_date')[:5]

        data = []
        for pb in upcoming:
            data.append({
                'purchase_id': pb.purchase.id,
                'product_name': pb.purchase.product_name,
                'benefit_name': pb.benefit.name,
                'expiration_date': pb.expiration_date,
                'days_remaining': (pb.expiration_date - now).days if pb.expiration_date else None
            })
            
        return Response(data)

class DashboardTimelineView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        pbs = PurchaseBenefit.objects.filter(purchase__user=user).order_by('-activation_date')
        
        timeline = []
        for pb in pbs:
            timeline.append({
                'id': pb.id,
                'product_name': pb.purchase.product_name,
                'benefit_name': pb.benefit.name,
                'activation_date': pb.activation_date,
                'expiration_date': pb.expiration_date,
                'status': 'Active' if pb.is_activated else 'Expired'
            })
            
        return Response(timeline)
