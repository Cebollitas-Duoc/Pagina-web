from django.urls import path
from . import views

app_name = "departamentos"

urlpatterns = [
    path('', views.Home, name="Home"),
    path('departamento/<int:_Id_Dpto>', views.Departamento, name="Departamento"),
]