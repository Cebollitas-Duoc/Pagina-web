from django.shortcuts import render
from userManager.authAPI import isSessionValid

# Create your views here.

def Home(request):
    
    if "UsrName" in request.COOKIES:
        usrName = request.COOKIES["UsrName"]
    else:
        usrName = ""
    if "UsrImg" in request.COOKIES:
        usrImg = request.COOKIES["UsrImg"]
    else:
        usrImg = ""

    context = {
        "isLogged": isSessionValid(request)[0],
        "usrName": usrName,
        "usrImg": usrImg,
    }
    return render(request, "departamentos/home.html", context)