from django.urls import path
from . import views

app_name = "departamentos"

urlpatterns = [
    path('', views.Home, name="home"),
]