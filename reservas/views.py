from django.shortcuts import render
from .reservasAPI import *
from userManager.authAPI import *
from userManager.decorators import isUserLogged, isUserNotLogged
from datetime import datetime
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
    cookies = request.COOKIES
    SessionKey = cookies['SessionKey']
    depto = getDepto(reserva["ID_DEPARTAMENTO"])
    FECHADESDE = reserva["FECHADESDE"]
    FECHAHASTA = reserva["FECHAHASTA"]
    date1 = datetime.strptime(FECHADESDE, '%d-%m-%Y')
    date2 = datetime.strptime(FECHAHASTA, '%d-%m-%Y')
    delta = date2 - date1
    serviciosExtra = getServiciosExtra(_idreserva, SessionKey)
    context = {
        "reserva": reserva,
        "depto" : depto,
        "serviciosExtra" : serviciosExtra,
        "dias" : delta.days
    }
    return render(request, "reservas/ReservaDetalle.html", context)