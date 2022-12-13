from django.urls import path
from . import views

app_name = "reservas"

urlpatterns = [
    path('misreservas', views.Reservas, name="reserva"),
    path('ReservaDetalle/<int:_idreserva>', views.ReservaDetalle, name="ReservaDetalle")
]

