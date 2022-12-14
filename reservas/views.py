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
    serviciosextra = getServiciosExtra(reserva["ID_DEPARTAMENTO"])
    serv = []
    serviciosExtra = getServiciosExtraPay(_idreserva, SessionKey)
    for s in serviciosextra:
        for spay in serviciosExtra:
            serv.append(s)
            if s["Id_ExtraService"] == spay["Id_ExtSrv"]:
                serv.remove(s)
    context = {
        "reserva": reserva,
        "depto" : depto,
        "serviciosExtra" : serviciosExtra,
        "serv" : serv,
        "dias" : delta.days
    }
    return render(request, "reservas/ReservaDetalle.html", context)