from django.shortcuts import render
from .reservasAPI import *
from userManager.authAPI import *
from userManager.decorators import isUserLogged, isUserNotLogged
# Create your views here.

@isUserLogged()
def Reserva(request):
    reservas = getReservasFixed(request)
    context = {
        "reservas" : reservas
    }
    return render(request, "reservas/mireserva.html", context)

@isUserLogged()
def ReservaDetalle(request, _idreserva):
    reserva = getReserva(_idreserva)
    depto = getDepto(reserva["ID_DEPARTAMENTO"])
    context = {
        "reserva": reserva,
        "depto" : depto
    }
    return render(request, "reservas/ReservaDetalle.html", context)