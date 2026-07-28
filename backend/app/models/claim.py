from django.db import models
from django.conf import settings
from .purchase import Purchase
from .benefit import Benefit

class Claim(models.Model):
    STATUS_CHOICES = (
        ('Draft', 'Draft'),
        ('Ready', 'Ready'),
        ('Submitted', 'Submitted'),
        ('Under Review', 'Under Review'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Closed', 'Closed'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='claims')
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, related_name='claims')
    benefit = models.ForeignKey(Benefit, on_delete=models.CASCADE, related_name='claims')
    
    claim_number = models.CharField(max_length=50, unique=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Draft')
    claim_reason = models.TextField(blank=True)
    
    supporting_document = models.FileField(upload_to='claims/documents/', null=True, blank=True)
    ai_draft_summary = models.TextField(null=True, blank=True)
    
    submitted_at = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Claim {self.claim_number} - {self.status}"
