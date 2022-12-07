from django.shortcuts import render
from .reservasAPI import *
from userManager.authAPI import *
# Create your views here.

def Reserva(request):
    reservas = getReservasFixed(request)
    context = {
        "reservas" : reservas
    }
    return render(request, "reservas/mireserva.html", context)

def ReservaDetalle(request, _iddepto):
    depto = getDepto(_iddepto)
    context = {
        "depto" : depto
    }
    return render(request, "reservas/ReservaDetalle.html", context)