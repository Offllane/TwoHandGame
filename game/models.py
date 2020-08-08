import datetime

from django.utils import timezone
from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    score = models.PositiveIntegerField('score', default = 0)
    date_of_score = models.CharField('date of record', default = datetime.date.today().strftime("%d.%m.%Y"), blank = False, max_length = 100)
    hardmode_score = models.PositiveIntegerField ('hardmode score', default = 0)
    hardmode_date_of_score = models.CharField ('date of record(hardmode)',
                                               default = datetime.date.today ().strftime ("%d.%m.%Y"), blank = False,
                                               max_length = 100)
    gamemode = models.CharField('game mode', default = 'easy', max_length = 100)


