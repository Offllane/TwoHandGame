from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    score = models.PositiveIntegerField('score', default = 0)


