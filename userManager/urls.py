from django.urls import path
from . import views

app_name = "userManager"

urlpatterns = [
    path('login', views.Login, name="Login"),
    path('createUser', views.CreateUser, name="CreateUser"),
]