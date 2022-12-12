from django.urls import path
from . import views

app_name = "chat"

urlpatterns = [
    path('<int:idRsv>', views.Chat, name="chat"),
]