from django.urls import path
from . import views

app_name = "pagos"

urlpatterns = [
    path('verificarpago', views.verficar, name="verficar"),
]