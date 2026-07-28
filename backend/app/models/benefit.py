from django.db import models

class Benefit(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    benefit_type = models.CharField(max_length=100)
    coverage_period_days = models.IntegerField(default=90)
    max_coverage_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    eligibility_rules = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
