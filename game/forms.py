from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms


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
    password = forms.CharField(label = 'Password', widget = forms.PasswordInput)
    password2 = forms.CharField(label = 'Repeat password', widget = forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ['username']

    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError('Password don\'t match.')
        return cd['password2']


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget = forms.PasswordInput)


#
# class CreateUserForm(forms.ModelForm):
#     class Meta:
#         model = Player
#         fields = ['nickname']
#
# class UserForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']
#
# class ProfileForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = ['score']
