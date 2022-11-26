from email import header
import requests
import json
from turismorealweb.settings import localHostIp
from os import path
from turismorealweb.settings import BASE_DIR

def getFormattedDptoServices(idDpto):
    services = getDptoServices(idDpto)
    serviceCategorys = getDptoServiceCategorys()
    for service in services:
        idCat = service["Id_ServiceCategory"]
        for category in serviceCategorys:
            if (category["Id_Categoria"] == idCat):
                service["Nombre"] = category["Descripcion"]
        x = str(BASE_DIR)
        print(x)
        imgPath = path.join(x, "static/img/servicios/", f"{idCat}.png")
        print(imgPath)
        if (path.exists(imgPath)):
            service["img"] = f"{idCat}.png"
        else:
            service["img"] = "0.png"
        
    return services

def getDptoServices(idDpto):        
    url = f"http://{localHostIp}:8081/departamentos/listservices/{idDpto}"

    payload = {}
    files={}
    headers={}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    return ([])

def getServiciosExtra(ID_depto):
    url = f"http://{localHostIp}:8081/departamentos/listextraservices/{ID_depto}" 

    payload={}
    files={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)

    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    return ([])
def getFormattedServiciosExtra(ID_depto):
    extras = getServiciosExtra(ID_depto)
    serviceCategorys = getDptoExtraServiceCategorys()
    for extra in extras:
        idCat = extra["Id_ExtraService"]
        for category in serviceCategorys:
            if (category["Id_Category"] == idCat):
                extra["Nombre"] = category["Description"]
        
    return extras

def getDptoServiceCategorys():        
    url = f"http://{localHostIp}:8081/departamentos/listservicecategories/"

    payload = {}
    files={}
    headers={}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    return ([])

def getDptoExtraServiceCategorys():        
    url = f"http://{localHostIp}:8081/departamentos/listextraservicecategories/"

    payload = {}
    files={}
    headers={}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    return ([])