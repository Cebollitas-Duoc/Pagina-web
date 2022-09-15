import requests
import json

from sympy import false

def isSessionValid(request):
    if "LogedIn" not in request.COOKIES or request.COOKIES["LogedIn"] == "false":
        return (False, 0)
        
    url = "http://api.mrmeme.cl/auth/ValidateSession/"

    payload={}
    files={}
    headers = {
        'SessionKey': request.COOKIES["SessionKey"]
    }

    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    if response.status_code == 200:
        r = json.loads(response.text)
        return (r["Valid"], r["userId"])
    return (False, 0)

