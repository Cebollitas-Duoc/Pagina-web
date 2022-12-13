from django.shortcuts import render
from .reservasAPI import *
from userManager.authAPI import *
from userManager.decorators import isUserLogged, isUserNotLogged
# Create your views here.

@isUserLogged()
def Reservas(request):
    reservas = getReservasFixed(request)
    context = {
        "reservas" : reservas
    }
    return render(request, "reservas/misReservas.html", context)

@isUserLogged()
def ReservaDetalle(request, _idreserva):
    reserva = getReserva(_idreserva)
    depto = getDepto(reserva["ID_DEPARTAMENTO"])
    context = {
        "reserva": reserva,
        "depto" : depto
    }
    return render(request, "reservas/ReservaDetalle.html", context)