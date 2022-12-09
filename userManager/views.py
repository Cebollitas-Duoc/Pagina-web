from django.shortcuts import render
from django.shortcuts import redirect
from .authAPI import *
from .decorators import isUserLogged, isUserNotLogged

# Create your views here.

class Profile:
    names     = ""
    lastnames = ""
    rut       = ""
    email     = ""
    address   = ""
    phone     = ""

    # default constructor
    def __init__(self, names, lastnames, rut, email, address, phone):
        self.names     = names
        self.lastnames = lastnames
        self.rut       = rut
        self.email     = email
        self.address   = address
        self.phone     = phone

@isUserNotLogged()
def Login(request):
    return render(request, "userManager/login.html")

@isUserNotLogged()
def CreateUser(request):
    return render(request, "userManager/createUser.html")

@isUserLogged()
def MyProfile(request):
    profileData = getSessionProfile(request)
    p = Profile(
        f"{profileData['Name']} {profileData['Name2']}", 
        f"{profileData['LastName']} {profileData['LastName2']}",
        profileData['Rut'], 
        profileData['Email'], 
        profileData['Address'], 
        profileData['Phone']
    )
    context = {
        "profile": p
    }
    return render(request, "userManager/MyProfile.html", context)

@isUserLogged()
def ChangePassword(request):
    context = {
    }
    return render(request, "userManager/ChangePassword.html", context)

def LogOut(request):
    response = redirect("departamentos:Home")
    response.delete_cookie('LogedIn')
    response.delete_cookie('SessionKey')
    response.delete_cookie('UsrImg')
    response.delete_cookie('UsrName')
    return response