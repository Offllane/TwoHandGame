from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    score = models.PositiveIntegerField('score', default = 0)


# class Player(models.Model):
#     nickname = models.CharField("Name", max_length=30)
#     score = models.PositiveIntegerField("Score",default=0)
#
#     def __str__(self):
#         return self.nickname
#
#     class Meta:
#         verbose_name = "Player"
#         verbose_name_plural = "Players"

# class Player(models.Model):
#     nickname = models.CharField("Name", max_length=30)
#     score = models.PositiveIntegerField("Score",default=0)
#
#     def __str__(self):
#         return self.nickname
#
#     class Meta:
#         verbose_name = "Player"
#         verbose_name_plural = "Players"
#
#
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     score = models.PositiveIntegerField("Score", default=0)
#
#
# @receiver(post_save, sender=User)
# def create_user_profile(sender,instance,created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#     instance.profile.save()
