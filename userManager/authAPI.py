import requests
import json

from sympy import false

def isSessionValid(request):
    if "Valid" not in request.COOKIES or not request.COOKIES["Valid"]:
        return (False, 0)

    url = "http://api.mrmeme.cl/auth/ValidateSession/"

    payload={}
    files={}
    headers = {
        'SessionKey': key
    }

    response = requests.request("GET", url, headers=headers, data=payload, files=files)
    print(response.status_code)
    if response.status_code == 200:
        r = json.loads(response.text)
        return (r["Valid"], r["userId"])

