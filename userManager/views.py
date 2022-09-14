from django.shortcuts import render

# Create your views here.

def Login(request):
    context = {
    }
    return render(request, "userManager/login.html", context)

def CreateUser(request):
    context = {
    }
    return render(request, "userManager/createUser.html", context)