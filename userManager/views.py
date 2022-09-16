from django.shortcuts import render
from django.http import HttpResponseRedirect
from .authAPI import isSessionValid
from django.shortcuts import redirect

# Create your views here.

def Login(request):
    context = {
    }
    return render(request, "userManager/login.html", context)

def CreateUser(request):
    context = {
    }
    return render(request, "userManager/createUser.html", context)

def LogOut(request):
    response = redirect("departamentos:Home")
    response.delete_cookie('LogedIn')
    response.delete_cookie('SessionKey')
    response.delete_cookie('UsrImg')
    response.delete_cookie('UsrName')
    return response