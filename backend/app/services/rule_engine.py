import datetime
from decimal import Decimal
from django.utils import timezone
from app.models import Benefit, PurchaseBenefit

class BaseRule:
    def check_eligibility(self, purchase):
        raise NotImplementedError

    def calculate_expiration(self, purchase):
        raise NotImplementedError

    def calculate_coverage(self, purchase):
        raise NotImplementedError

class PurchaseProtectionRule(BaseRule):
    def check_eligibility(self, purchase):
        # Only Platinum, Gold, Everyday offer this
        if purchase.card_used not in ['AMEX Platinum', 'AMEX Gold', 'AMEX Everyday']:
            return False
        # Eligible if purchase is less than 90 days old
        return (timezone.now().date() - purchase.purchase_date).days <= 90

    def calculate_expiration(self, purchase):
        return purchase.purchase_date + datetime.timedelta(days=90)

    def calculate_coverage(self, purchase):
        return min(purchase.amount, Decimal('10000.00'))

class ExtendedWarrantyRule(BaseRule):
    def check_eligibility(self, purchase):
        # Platinum, Gold, Green? Actually basic coverage might not include it, but let's assume all AMEX except basic?
        # In advisor: Platinum and Gold have it. Everyday doesn't. What about Green?
        # Let's say Platinum, Gold, Green have it.
        if purchase.card_used not in ['AMEX Platinum', 'AMEX Gold', 'AMEX Green']:
            return False
        # Eligible for electronics/appliances
        return purchase.category.lower() in ['electronics', 'appliances', 'home', 'technology']

    def calculate_expiration(self, purchase):
        return purchase.purchase_date + datetime.timedelta(days=365 * 2) # Extra year usually

    def calculate_coverage(self, purchase):
        return min(purchase.amount, Decimal('10000.00'))

class ReturnProtectionRule(BaseRule):
    def check_eligibility(self, purchase):
        # Only Platinum offers this
        if purchase.card_used != 'AMEX Platinum':
            return False
        return (timezone.now().date() - purchase.purchase_date).days <= 90

    def calculate_expiration(self, purchase):
        return purchase.purchase_date + datetime.timedelta(days=90)

    def calculate_coverage(self, purchase):
        return min(purchase.amount, Decimal('300.00'))

BENEFIT_RULES = {
    'Purchase Protection': PurchaseProtectionRule(),
    'Extended Warranty': ExtendedWarrantyRule(),
    'Return Protection': ReturnProtectionRule(),
}

def evaluate_purchase(purchase):
    """
    Evaluates a purchase against all active benefits and creates PurchaseBenefit records.
    Generates AI explanations for eligible benefits.
    """
    from .ai.interpreter import AIBenefitInterpreter
    
    benefits = Benefit.objects.filter(is_active=True)
    ai_interpreter = AIBenefitInterpreter()
    
    for benefit in benefits:
        rule = BENEFIT_RULES.get(benefit.name)
        if rule:
            is_eligible = rule.check_eligibility(purchase)
            if is_eligible:
                expiration_date = rule.calculate_expiration(purchase)
                
                # Check if PurchaseBenefit already exists
                pb, created = PurchaseBenefit.objects.update_or_create(
                    purchase=purchase,
                    benefit=benefit,
                    defaults={
                        'eligibility_status': 'Eligible',
                        'is_activated': True,
                        'activation_date': purchase.purchase_date,
                        'expiration_date': expiration_date,
                        'claim_status': 'None'
                    }
                )
                
                # Generate AI Summary
                pb.ai_summary = ai_interpreter.generate_explanation(purchase, pb)
                pb.save()
