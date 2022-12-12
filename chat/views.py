from django.shortcuts import render

# Create your views here.

def Chat(request, idRsv):
    context = {
    }
    return render(request, "chat/Chat.html", context)