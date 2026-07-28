from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db import connection

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    try:
        connection.ensure_connection()
        db_status = 'ok'
    except Exception:
        db_status = 'error'
        
    return Response({
        'status': 'ok' if db_status == 'ok' else 'degraded',
        'database': db_status
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def metrics_view(request):
    # Placeholder for Prometheus or OpenTelemetry metrics
    return Response({
        'message': 'Metrics endpoint placeholder for Prometheus/OpenTelemetry scraping'
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def version_view(request):
    return Response({
        'version': '1.0.0',
        'environment': 'production_ready'
    })
