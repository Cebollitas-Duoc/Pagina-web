from userManager.authAPI import isSessionValid

def user_renderer(request):
    if "UsrName" in request.COOKIES:
        usrName = request.COOKIES["UsrName"]
    else:
        usrName = ""
    if "UsrImg" in request.COOKIES:
        usrImg = request.COOKIES["UsrImg"]
    else:
        usrImg = ""

    return {
        "isLogged": isSessionValid(request)[0],
        "usrName": usrName,
        "usrImg": usrImg,
    }