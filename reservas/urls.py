from django.urls import path
from . import views

app_name = "reservas"

urlpatterns = [
    path('mireserva', views.Reserva, name="reserva"),
    path('ReservaDetalle/<int:_iddepto>', views.ReservaDetalle, name="ReservaDetalle")
]

