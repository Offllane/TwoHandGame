# Generated by Django 3.0.8 on 2020-08-03 15:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='date_of_score',
            field=models.CharField(default=datetime.date(2020, 7, 25), max_length=100, verbose_name='date of record'),
        ),
    ]
