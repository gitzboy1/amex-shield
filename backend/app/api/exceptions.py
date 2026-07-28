from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        if isinstance(response.data, dict):
            detail = response.data.get('detail', str(exc))
        else:
            detail = str(response.data)
            
        response.data = {
            'error': True,
            'detail': detail
        }
    else:
        logger.error(f"Unhandled Exception: {str(exc)}", exc_info=True)
        return Response({
            'error': True,
            'detail': 'An unexpected error occurred. Please try again later.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return response
