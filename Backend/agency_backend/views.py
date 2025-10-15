"""
Custom error handlers for production
"""
from django.http import JsonResponse
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def error_404(request, exception=None):
    """Handle 404 errors"""
    logger.warning(f"404 Error: {request.path}")
    
    return JsonResponse({
        'error': 'Not Found',
        'message': 'The requested resource was not found.',
        'status_code': 404,
        'path': request.path
    }, status=404)


def error_500(request):
    """Handle 500 errors"""
    logger.error(f"500 Error on path: {request.path}")
    
    response_data = {
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred. Please try again later.',
        'status_code': 500
    }
    
    if settings.DEBUG:
        import traceback
        response_data['traceback'] = traceback.format_exc()
    
    return JsonResponse(response_data, status=500)


def error_403(request, exception=None):
    """Handle 403 errors"""
    logger.warning(f"403 Error: {request.path}")
    
    return JsonResponse({
        'error': 'Forbidden',
        'message': 'You do not have permission to access this resource.',
        'status_code': 403,
        'path': request.path
    }, status=403)


def error_400(request, exception=None):
    """Handle 400 errors"""
    logger.warning(f"400 Error: {request.path}")
    
    return JsonResponse({
        'error': 'Bad Request',
        'message': 'The request could not be understood by the server.',
        'status_code': 400,
        'path': request.path
    }, status=400)