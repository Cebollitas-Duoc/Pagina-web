from userManager.authAPI import *

def user_renderer(request):
    data = {}
    if ("SessionKey" in request.COOKIES):
        profileData = getSessionProfile(request)

        if (profileData["ValidSession"]):
            name = profileData["Name"]
            lastName = profileData["LastName"]
            data = {
            "isLogged": True,
            "usrName": f"{name} {lastName}",
            "usrImg": profileData["Picture"],
            }
        else:
            data = {
            "isLogged": False,
            "usrName": "",
            "usrImg": "/img/profiles/default.png",
            }

    return data