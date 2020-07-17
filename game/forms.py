from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from django.forms import TextInput

from game.models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = CustomUser
        fields = ['username', 'email', 'score']


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'score']


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(label = 'Password', widget = forms.PasswordInput(attrs = {'placeholder': 'Password'}), help_text = 'Password', )
    password2 = forms.CharField(label = 'Repeat password', widget = forms.PasswordInput(attrs = {'placeholder': 'Repeat password'}), help_text = 'Repeat password')

    class Meta:
        model = CustomUser
        fields = ['username']
        widgets = {
            'username': TextInput(attrs = {
                'placeholder': 'Username'
             })
        }

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            print("fdsfsdfsdfds")
            raise forms.ValidationError('Password don\'t match.')
        return cd['password2']


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget = forms.PasswordInput)



