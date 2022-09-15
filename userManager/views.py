from django.shortcuts import render
from .authAPI import isSessionValid

# Create your views here.

def Login(request):
    context = {
        "isLogged": isSessionValid(request)[0] 
    }
    return render(request, "userManager/login.html", context)

def CreateUser(request):
    context = {
        "isLogged": isSessionValid(request)[0] 
    }
    return render(request, "userManager/createUser.html", context)