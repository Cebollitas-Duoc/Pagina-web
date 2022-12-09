from .authAPI import *
from django.shortcuts import redirect

def isUserLogged(redirectUrl="userManager:Login"):
    def inner(func):
        def wrapper(*args, **kw):
            valid = isSessionValid(args[0])[0]
            if (valid):
                return func(*args, **kw)
            else:
                return redirect(redirectUrl)
        return wrapper
    return inner

def isUserNotLogged(redirectUrl="userManager:MyProfile"):
    def inner(func):
        def wrapper(*args, **kw):
            valid = isSessionValid(args[0])[0]
            if (not valid):
                return func(*args, **kw)
            else:
                return redirect(redirectUrl)
        return wrapper
    return inner