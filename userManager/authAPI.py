import requests
import json

from sympy import false

def isSessionValid(request):
    if "LogedIn" not in request.COOKIES or request.COOKIES["LogedIn"] != "true":
        return (False, 0)
        
    url = "http://api.mrmeme.cl/auth/ValidateSession/"

    payload={}
    files={}
    body = {
        'SessionKey': request.COOKIES["SessionKey"]
    }

    response = requests.request("GET", url, body=body, data=payload, files=files)
    if response.status_code == 200:
        r = json.loads(response.text)
        return (r["Valid"], r["userId"])
    return (False, 0)

def getSessionProfile(request):
    url = "http://api.mrmeme.cl/profile/getsessionprofile/"

    payload={}
    files={}
    body = {
    'SessionKey': request.COOKIES["SessionKey"]
    }

    response = requests.request("GET", url, body=body, data=payload, files=files)

    if response.status_code == 200:
        r = json.loads(response.text)
        return r
    #TODO: que hace en caso de que no sea codigo 200

