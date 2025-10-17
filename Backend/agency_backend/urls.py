"""
URL Configuration for Agency Backend (Production-Ready)
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)


def health_check(request):
    """Health check endpoint for monitoring"""
    return JsonResponse({
        'status': 'healthy',
        'service': 'agency-backend',
        'version': '1.0.0'
    })


def api_root(request):
    """API root endpoint with available endpoints"""
    return JsonResponse({
        'message': 'Welcome to Agency Backend API',
        'version': 'v1',
        'endpoints': {
            'services': '/api/v1/services/',
            'blog': '/api/v1/blogs/',
            'contact': '/api/v1/contact/',
            'teams': '/api/v1/teams/',
            'portfolio': '/api/v1/portfolio/',
            'docs': '/api/docs/',
            'admin': '/admin/',
        },
        'documentation': {
            'swagger': '/api/docs/',
            'redoc': '/api/redoc/',
            'schema': '/api/schema/',
        }
    })


# Admin customization
admin.site.site_header = "Agency Backend Administration"
admin.site.site_title = "Agency Admin"
admin.site.index_title = "Welcome to Agency Backend Admin"

urlpatterns = [
    # ========================================
    # ADMIN
    # ========================================
    path('admin/', admin.site.urls),
    
    # ========================================
    # HEALTH CHECK & ROOT
    # ========================================
    path('health/', health_check, name='health-check'),
    path('api/', api_root, name='api-root'),
    
    # ========================================
    # API DOCUMENTATION
    # ========================================
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # ========================================
    # API v1 ENDPOINTS
    # ========================================
    path('api/v1/', include([
        path('', include('services.urls')),
        path('', include('blog.urls')),
        path('', include('contacts.urls')),
        path('', include('teams.urls')),
        path('', include('portfolio.urls')),
    ])),
    
    # ========================================
    # AUTHENTICATION (if using DRF auth)
    # ========================================
    path('api/v1/auth/', include('rest_framework.urls', namespace='rest_framework')),
]

# ========================================
# DEVELOPMENT SETTINGS
# ========================================
if settings.DEBUG:
    # Serve media files in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# ========================================
# ERROR HANDLERS (Production)
# ========================================
handler404 = 'agency_backend.views.error_404'
handler500 = 'agency_backend.views.error_500'
handler403 = 'agency_backend.views.error_403'
handler400 = 'agency_backend.views.error_400'