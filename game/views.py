from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt

from game.forms import UserRegistrationForm, LoginForm
from game.models import  CustomUser

from django.contrib.auth.decorators import login_required


@login_required(login_url="/login")
def index(request):
    players = CustomUser.objects.all()
    players = players.order_by('score').reverse()
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
                    messages.info(request,'Invalid username or password')
            else:
                messages.info (request, 'Invalid username or password')
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
            login (request, new_user)
            return redirect('index')
        else:
            messages.info (request, 'Wrong repeat!')
            return render (request, 'game/register.html', {'upload_form': user_form})
    else:
        user_form = UserRegistrationForm()
        return render(request, 'game/register.html', {'upload_form':user_form})


def logoutUser(request):
    logout(request)
    return redirect('index')


@csrf_exempt
def update_score(request):
    if request.method == 'POST':
        data = request.POST['score']
        print('Score:', data)
        player = CustomUser.objects.get(username=request.user)
        print('Player:', player)
        if int(data) > int(player.score):
            player.score = data
            player.save()
        print('Score player:', player.score)
        return redirect('index')
    return redirect('index')
