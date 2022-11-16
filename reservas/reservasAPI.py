from email import header
import requests
import json
from turismorealweb.settings import localHostIp

from sympy import false

def getReservas(request):
    url = f"http://{localHostIp}:8081/reservas/getuserreserves/" 

    payload={'SessionKey': request.COOKIES["SessionKey"]}
    files={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)

    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    return r([])

def getDeptos(request):
    url = f"http://{localHostIp}:8081/departamentos/viewdptos/" 

    payload={}
    files={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)

    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    return r([])


def getReservasFixed(request):
    request_domain = request._current_scheme_host
    apidomain = "http://api.mrmeme.cl"
    if ("localhost" in request_domain):
        apidomain =  "http://localhost:8081"
    reservas = getReservas(request)
    dptos = getDeptos(request)
    for reserva in reservas:
        idRes = reserva["Id_Departamento"]
        for dpto in dptos:
            if (dpto["Id_Dpto"] == idRes):
                reserva["Nombre"] = dpto["Address"]
                reserva["Imagen"] = f"{apidomain}/files/getimage/{dpto['Imagen']}"
        
    return reservas