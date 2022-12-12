from django.urls import path, include
#settings
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static

urlpatterns = [
    path("", include("departamentos.urls")),
    path("user/", include("userManager.urls")),
    path("reservas/", include("reservas.urls")),
    path("pagos/", include("pagos.urls")),
    path("chat/", include("chat.urls")),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
