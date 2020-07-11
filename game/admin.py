from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin

from game.forms import CustomUserCreationForm, CustomUserChangeForm
from game.models import CustomUser

class CustomUserAdmin(UserAdmin):
    add_from = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', 'email', 'score']


admin.site.register(CustomUser,CustomUserAdmin)
