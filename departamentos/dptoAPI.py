from email import header
import requests
import json
from turismorealweb.settings import localHostIp

def getFormattedDptoServices(idDpto):
    services = getDptoServices(idDpto)
    serviceCategorys = getDptoServiceCategorys()
    for service in services:
        idCat = service["Id_ServiceCategory"]
        for category in serviceCategorys:
            if (category["Id_Categoria"] == idCat):
                service["Nombre"] = category["Descripcion"]
        
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