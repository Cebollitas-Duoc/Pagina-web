from django.shortcuts import render
from .authAPI import isSessionValid

# Create your views here.

def Login(request):
    print("request.COOKIES ############")
    print(isSessionValid(request))
    context = {
    }
    return render(request, "userManager/login.html", context)

def CreateUser(request):
    context = {
    }
    return render(request, "userManager/createUser.html", context)