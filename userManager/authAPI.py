from email import header
import requests
import json
from turismorealweb.settings import localHostIp

from sympy import false

def isSessionValid(request):
    if "LogedIn" not in request.COOKIES or request.COOKIES["LogedIn"] != "true":
        return (False, 0)
        
    url = f"http://{localHostIp}:8081/auth/ValidateSession/"

    payload = {'SessionKey': request.COOKIES["SessionKey"]}
    files={}
    headers={}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code == 200:
        r = json.loads(response.text)
        if (r["Valid"]):
            return (r["Valid"], r["userId"])
    return (False, 0)

def getSessionProfile(request):
    url = f"http://{localHostIp}:8081/profile/getsessionprofile/"

    payload={'SessionKey': request.COOKIES["SessionKey"]}
    files={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload, files=files)

    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    #TODO: que hace en caso de que no sea codigo 200

