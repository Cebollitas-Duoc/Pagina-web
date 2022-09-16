from django.shortcuts import render
from django.http import HttpResponseRedirect
from .authAPI import isSessionValid
from django.shortcuts import redirect

# Create your views here.

def Login(request):
    if "UsrName" in request.COOKIES:
        usrName = request.COOKIES["UsrName"]
    else:
        usrName = ""
    if "usrImg" in request.COOKIES:
        UsrImg = request.COOKIES["usrImg"]
    else:
        UsrImg = ""

    context = {
        "isLogged": isSessionValid(request)[0],
        "usrName": usrName,
        "usrImg": UsrImg,
    }
    return render(request, "userManager/login.html", context)

def CreateUser(request):
    if "UsrName" in request.COOKIES:
        usrName = request.COOKIES["UsrName"]
    else:
        usrName = ""
    if "usrImg" in request.COOKIES:
        UsrImg = request.COOKIES["usrImg"]
    else:
        UsrImg = ""

    context = {
        "isLogged": isSessionValid(request)[0],
        "usrName": usrName,
        "usrImg": UsrImg,
    }
    return render(request, "userManager/createUser.html", context)

def LogOut(request):
    response = redirect("departamentos:Home")
    response.delete_cookie('LogedIn')
    response.delete_cookie('SessionKey')
    response.delete_cookie('UsrImg')
    response.delete_cookie('UsrName')
    return response