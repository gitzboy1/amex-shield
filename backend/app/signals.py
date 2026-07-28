from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Purchase
from .services.rule_engine import evaluate_purchase
import logging

logger = logging.getLogger(__name__)

# Keep existing auth signals...
from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed

@receiver(user_logged_in)
def log_user_login(sender, request, user, **kwargs):
    logger.info(f"User logged in: {user.email}")

@receiver(user_logged_out)
def log_user_logout(sender, request, user, **kwargs):
    if user:
        logger.info(f"User logged out: {user.email}")

@receiver(user_login_failed)
def log_user_login_failed(sender, credentials, request, **kwargs):
    identifier = credentials.get('username') or credentials.get('email') or 'Unknown'
    logger.warning(f"Failed login attempt for: {identifier}")

# New Purchase signal
@receiver(post_save, sender=Purchase)
def process_purchase_benefits(sender, instance, created, **kwargs):
    """
    Trigger the rule engine whenever a purchase is saved/created.
    """
    evaluate_purchase(instance)
    logger.info(f"Evaluated benefits for purchase {instance.id}")
