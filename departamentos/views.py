from django.shortcuts import render
from userManager.authAPI import *

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

    context = {
        "deptos": deptos
    }
    return render(request, "departamentos/home.html", context)


# def Departamento(request,_Id_Dpto):
#     request_domain = request._current_scheme_host
#     apidomain = "http://api.mrmeme.cl"
#     if ("localhost" in request_domain):
#         apidomain =  "http://localhost:8081"

#     deptos = getDeptos(request)
#     for depto in deptos:
#         depto["Imagen"] = f"{apidomain}/files/getimage/{depto['Imagen']}"  
