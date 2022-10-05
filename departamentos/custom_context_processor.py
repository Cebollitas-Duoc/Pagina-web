from userManager.authAPI import *

def user_renderer(request):
    data = {
        "isLogged": False,
        "usrName": "",
        "usrImg": "/img/profiles/default.png",
    }
    if ("SessionKey" in request.COOKIES):
        profileData = getSessionProfile(request)

        if (profileData["ValidSession"]):
            name = profileData["Name"]
            lastName = profileData["LastName"]
            data["isLogged"] = True
            data["usrName"] = f"{name} {lastName}"
            
            if (profileData["Picture"] ):
                data["usrImg"] = profileData["Picture"]
            

    return data