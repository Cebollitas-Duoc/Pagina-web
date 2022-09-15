from django.shortcuts import render
from userManager.authAPI import isSessionValid

# Create your views here.

def Home(request):
    context = {
        "isLogged": isSessionValid(request)[0] 
    }
    return render(request, "departamentos/home.html", context)