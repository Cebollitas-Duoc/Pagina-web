from userManager.authAPI import *

def user_renderer(request):
    data = {}
    profileData = getSessionProfile(request)

    if (isSessionValid(request)[0]):
        data = {
        "isLogged": True,
        "usrName": f"{profileData["Name"]} {profileData["LastName"]}",
        "usrImg": profileData["Picture"],
        }
    else:
        data = {
        "isLogged": False,
        "usrName": "",
        "usrImg": "/img/profiles/default.png",
        }

    return data