from django.shortcuts import render

# Create your views here.
def verficar(request):
    context = {
        "token" : "token"
    }
    return render(request, "pagos/verify.html", context)