from app.models import Notification

class NotificationService:
    @staticmethod
    def create_notification(user, n_type, title, message):
        return Notification.objects.create(
            user=user,
            notification_type=n_type,
            title=title,
            message=message
        )

    @staticmethod
    def notify_claim_submitted(user, claim):
        return NotificationService.create_notification(
            user, 
            'Claim Update',
            f'Claim {claim.claim_number} Submitted',
            f'Your claim for {claim.purchase.product_name} under {claim.benefit.name} has been successfully submitted and is under review.'
        )

    @staticmethod
    def notify_benefit_expiring(user, purchase_benefit, days_left):
        return NotificationService.create_notification(
            user,
            'Expiring Soon',
            f'Benefit Expiring in {days_left} Days',
            f'Your {purchase_benefit.benefit.name} coverage for {purchase_benefit.purchase.product_name} will expire on {purchase_benefit.expiration_date}.'
        )
