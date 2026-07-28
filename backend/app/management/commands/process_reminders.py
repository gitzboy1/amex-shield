from django.core.management.base import BaseCommand
from django.utils import timezone
import datetime
from app.models import PurchaseBenefit
from app.services.notifications.engine import NotificationService

class Command(BaseCommand):
    help = 'Process reminders for expiring benefits'

    def handle(self, *args, **options):
        now = timezone.now().date()
        
        intervals = [30, 7, 1]
        
        for days in intervals:
            target_date = now + datetime.timedelta(days=days)
            
            expiring_pbs = PurchaseBenefit.objects.filter(
                is_activated=True,
                expiration_date=target_date
            )
            
            for pb in expiring_pbs:
                # Basic check to avoid duplicate notifications on the same day could be added here
                NotificationService.notify_benefit_expiring(pb.purchase.user, pb, days)
                self.stdout.write(self.style.SUCCESS(f'Created reminder for {pb.purchase.product_name} ({days} days)'))
                
        self.stdout.write(self.style.SUCCESS('Successfully processed reminders.'))
