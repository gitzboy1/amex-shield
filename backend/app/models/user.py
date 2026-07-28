from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Add custom fields here if needed in the future
    # e.g., phone_number = models.CharField(max_length=20, blank=True, null=True)
    pass
