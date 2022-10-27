from django.shortcuts import render
from userManager.authAPI import *
# Create your views here.

def Reserva(request):
    reservas = getReservas(request)
    context = {
        "reservas" : reservas
    }
    return render(request, "reservas/mireserva.html", context)