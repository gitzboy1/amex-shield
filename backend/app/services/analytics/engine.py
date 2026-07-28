from django.db.models import Count
from django.contrib.auth import get_user_model
from app.models import Purchase, PurchaseBenefit, Claim

User = get_user_model()

class AnalyticsEngine:
    @staticmethod
    def get_dashboard_metrics():
        total_users = User.objects.count()
        total_purchases = Purchase.objects.count()
        total_benefits = PurchaseBenefit.objects.filter(is_activated=True).count()
        total_claims = Claim.objects.count()
        
        claims_by_status = list(Claim.objects.values('status').annotate(count=Count('status')))
        
        # Format for Recharts
        status_chart = [{"name": item['status'], "value": item['count']} for item in claims_by_status]

        return {
            "total_users": total_users,
            "total_purchases": total_purchases,
            "total_benefits": total_benefits,
            "total_claims": total_claims,
            "claims_by_status": status_chart
        }
