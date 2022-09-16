from userManager.authAPI import isSessionValid

def user_renderer(request):
    usrName = request.COOKIES["UsrName"] if "UsrName" in request.COOKIES else ""
    usrImg  = request.COOKIES["UsrImg"]  if "UsrImg"  in request.COOKIES else ""

    return {
        "isLogged": isSessionValid(request)[0],
        "usrName": usrName,
        "usrImg": usrImg,
    }