from django.shortcuts import render

# Create your views here.

def Reserva(request):
    context ={}
    return render(request, "reservas/mireserva.html", context)