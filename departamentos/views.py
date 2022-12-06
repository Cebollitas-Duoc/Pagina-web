from django.shortcuts import render
from userManager.authAPI import *
from .dptoAPI import *

# Create your views here.
class Depto:
    Id_Dpto = 0
    Address = 0
    Longitud = 0
    Latitud = 0
    Rooms = 0
    Bathrooms = 0
    Size = 0
    Value = 0
    Id_State = 0
    Imagen = 0

    def __init__(self, Id_Dpto, Address, Longitud, Latitud, Rooms , Bathrooms, Size, Value, Id_State, Imagen):
        self.Id_Dpto = Id_Dpto
        self.Address = Address
        self.Longitud = Longitud
        self.Latitud = Latitud
        self.Rooms = Rooms
        self.Bathrooms = Bathrooms
        self.Size = Size
        self.Value = Value
        self.Id_State = Id_State
        self.Imagen = Imagen

def Home(request):
    request_domain = request._current_scheme_host
    apidomain = "http://api.mrmeme.cl"
    if ("localhost" in request_domain):
        apidomain =  "http://localhost:8081"

    deptos = getDeptos(request)
    for depto in deptos:
        depto["Imagen"] = f"{apidomain}/files/getimage/{depto['Imagen']}"
    for depto in deptos:
        if depto["Id_State"] == 1:
            deptos.remove(depto)
    context = {
        "deptos": deptos
    }
    return render(request, "departamentos/home.html", context)


def Departamento(request,_Id_Dpto):
    request_domain = request._current_scheme_host
    apidomain = "http://api.mrmeme.cl"
    if ("localhost" in request_domain):
        apidomain =  "http://localhost:8081"

    depto = getDepto(_Id_Dpto)
    Imagenes = getImagenes(_Id_Dpto)
    servicios = getFormattedDptoServices(_Id_Dpto)
    serviciosextra = getFormattedServiciosExtra(_Id_Dpto)
    Fotos = []
    for Imagen in Imagenes:
        Fotos.append(str(f"{apidomain}/files/getimage/{Imagen['Path']}"))
    context = {
        "depto": depto,
        "Imagenes": Fotos,
        "servicios": servicios,
        "Id_Dpto":_Id_Dpto,
        "serviciosextra": serviciosextra,
    }
    return render(request, "departamentos/depto.html", context)

