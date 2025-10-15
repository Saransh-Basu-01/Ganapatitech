from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('services/', include('services.urls')),
    path('blog/', include('blog.urls')),
    path('contact/', include('contacts.urls')),
    path('teams/', include('teams.urls')),
]
