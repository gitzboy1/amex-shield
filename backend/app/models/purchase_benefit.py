from django.db import models
from .purchase import Purchase
from .benefit import Benefit

class PurchaseBenefit(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE, related_name='benefits')
    benefit = models.ForeignKey(Benefit, on_delete=models.CASCADE, related_name='purchases')
    eligibility_status = models.CharField(max_length=50, default='Eligible')
    is_activated = models.BooleanField(default=True)
    activation_date = models.DateField(null=True, blank=True)
    expiration_date = models.DateField(null=True, blank=True)
    claim_status = models.CharField(max_length=50, default='None')
    ai_summary = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = ('purchase', 'benefit')

    def __str__(self):
        return f"{self.purchase.product_name} - {self.benefit.name}"
