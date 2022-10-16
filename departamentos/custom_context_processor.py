from userManager.authAPI import *

def user_renderer(request):
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
                data["usrImg"] = f"http://api.mrmeme.cl/files/getimage/{profileData['Picture']}"
            
    return data