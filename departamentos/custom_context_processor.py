from userManager.authAPI import isSessionValid

def hasImg(cookies):
    o = True
    if "UsrImg" not in cookies:
        o = False
    elif cookies["UsrImg"] == "null":
        o = False
    elif cookies["UsrImg"] == "null":
        o = True
    return o

def user_renderer(request):
    usrName = request.COOKIES["UsrName"] if "UsrName" in request.COOKIES else ""
    usrImg  = request.COOKIES["UsrImg"]  if hasImg(request.COOKIES)  else "/img/profiles/default.png"

    return {
        "isLogged": isSessionValid(request)[0],
        "usrName": usrName,
        "usrImg": usrImg,
    }