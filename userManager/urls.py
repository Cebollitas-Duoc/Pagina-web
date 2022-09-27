from django.urls import path
from . import views

app_name = "userManager"

urlpatterns = [
    path('login', views.Login, name="Login"),
    path('createuser', views.CreateUser, name="CreateUser"),
    path('logout', views.LogOut, name="LogOut"),
    path('myprofile', views.MyProfile, name="MyProfile"),
]