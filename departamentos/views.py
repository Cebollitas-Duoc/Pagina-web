from django.shortcuts import render
from userManager.authAPI import isSessionValid

# Create your views here.

def Home(request):
    return render(request, "departamentos/home.html")