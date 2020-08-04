import datetime

from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.



class CustomUser(AbstractUser):
    score = models.PositiveIntegerField('score', default = 0)
    date_of_score = models.CharField('date of record', default = datetime.date.today().strftime('%d.%m.%Y'), blank = False, max_length = 100)


