from userManager.authAPI import *

def user_renderer(request):
    request_domain = request._current_scheme_host
    apidomain = "http://api.mrmeme.cl"
    if ("localhost" in request_domain):
        apidomain =  "http://localhost:8081"
    data = {
        "isLogged": False,
        "usrName": "",
        "usrImg": "/static/img/profiles/default.png",
    }
    if ("SessionKey" in request.COOKIES and request.COOKIES["SessionKey"] != ""):
        profileData = getSessionProfile(request)
        if (profileData["ValidSession"]):
            name = profileData["Name"]
            lastName = profileData["LastName"]
            data["isLogged"] = True
            data["usrName"] = f"{name} {lastName}"
            
            if (profileData["Picture"] ):
                data["usrImg"] = f"{apidomain}/files/getimage/{profileData['Picture']}"
            
    return data