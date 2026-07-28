import uuid
from django.utils import timezone
from app.models import Claim
from app.services.notifications.engine import NotificationService
from app.services.ai.claim_writer import AIClaimWriter

class ClaimService:
    @staticmethod
    def create_claim(user, purchase, benefit):
        claim_num = f"CLM-{uuid.uuid4().hex[:8].upper()}"
        
        ai_writer = AIClaimWriter()
        draft_summary = ai_writer.generate_claim_summary(purchase, benefit)
        
        claim = Claim.objects.create(
            user=user,
            purchase=purchase,
            benefit=benefit,
            claim_number=claim_num,
            status='Draft',
            ai_draft_summary=draft_summary
        )
        return claim

    @staticmethod
    def submit_claim(claim):
        if claim.status not in ['Draft', 'Ready']:
            raise ValueError("Claim must be in Draft or Ready status to submit.")
            
        claim.status = 'Submitted'
        claim.submitted_at = timezone.now()
        claim.save()
        
        NotificationService.notify_claim_submitted(claim.user, claim)
        return claim
