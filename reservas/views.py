from django.shortcuts import render
from .reservasAPI import *
# Create your views here.

def Reserva(request):
    reservas = getReservasFixed(request)
    context = {
        "reservas" : reservas
    }
    return render(request, "reservas/mireserva.html", context)