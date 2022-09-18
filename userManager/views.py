from django.shortcuts import render
from django.http import HttpResponseRedirect
from .authAPI import *
from django.shortcuts import redirect

# Create your views here.

class Profile:
    names     = ""
    lastnames = ""
    email     = ""
    address   = ""
    phone     = ""

    # default constructor
    def __init__(self, names, lastnames, email, address, phone):
        self.names     = names
        self.lastnames = lastnames
        self.email     = email
        self.address   = address
        self.phone     = phone


def Login(request):
    return render(request, "userManager/login.html")

def CreateUser(request):
    return render(request, "userManager/createUser.html")

def MyProfile(request):
    if not isSessionValid(request)[0]:
        return redirect("departamentos:Home")
    profileData = getSessionProfile(request)
    p = Profile(
        f"{profileData['Name']} {profileData['Name2']}", 
        f"{profileData['LastName']} {profileData['LastName2']}", 
        profileData['Email'], 
        profileData['Address'], 
        profileData['Phone']
    )
    context = {
        "profile": p
    }
    return render(request, "userManager/MyProfile.html", context)

def LogOut(request):
    response = redirect("departamentos:Home")
    response.delete_cookie('LogedIn')
    response.delete_cookie('SessionKey')
    response.delete_cookie('UsrImg')
    response.delete_cookie('UsrName')
    return response