from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render, redirect

from game.forms import UserRegistrationForm, LoginForm
from game.models import  CustomUser


def index(request):
    players = CustomUser.objects.all()
    return render(request,'game/index.html', {'players':players})


def user_login(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('index')
                else:
                    return HttpResponse('Disable account')
            else:
                return HttpResponse('Invalid login')
    else:
        form = LoginForm()
    return render(request, 'game/login.html', {'form' : form})


def register(request):
    if  request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            new_user = user_form.save(commit = False)
            new_user.set_password(user_form.cleaned_data['password'])
            new_user.save()
            login(request,new_user)
            return redirect('index')
    else:
        user_form = UserRegistrationForm()
        return render(request, 'game/register.html', {'upload_form':user_form})


def logoutUser(request):
    logout(request)
    return redirect('index')
