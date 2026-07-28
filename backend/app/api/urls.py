from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.auth import RegisterView, UserProfileView, ChangePasswordView, LogoutView
from .views.purchases import PurchaseViewSet, BenefitViewSet
from .views.dashboard import DashboardSummaryView, DashboardUpcomingView, DashboardTimelineView
from .views.receipts import ReceiptUploadView
from .views.claims import ClaimViewSet
from .views.notifications import NotificationViewSet
from .views.admin import admin_dashboard_metrics, AdminUserViewSet, AdminAuditLogViewSet
from .views.health import health_check, metrics_view, version_view
from .views.advisor import AdvisorView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

router = DefaultRouter()
router.register(r'purchases', PurchaseViewSet, basename='purchase')
router.register(r'benefits', BenefitViewSet, basename='benefit')
router.register(r'claims', ClaimViewSet, basename='claim')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'admin/users', AdminUserViewSet, basename='admin-user')
router.register(r'admin/audit', AdminAuditLogViewSet, basename='admin-audit')

urlpatterns = [
    # Auth
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/me/', UserProfileView.as_view(), name='current_user'),
    
    # Dashboard custom views
    path('dashboard/summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),
    path('dashboard/upcoming/', DashboardUpcomingView.as_view(), name='dashboard-upcoming'),
    path('dashboard/timeline/', DashboardTimelineView.as_view(), name='dashboard-timeline'),
    
    # Receipts
    path('receipts/upload/', ReceiptUploadView.as_view(), name='receipt-upload'),
    
    # AI Advisor
    path('advisor/', AdvisorView.as_view(), name='advisor'),
    
    # Admin custom views
    path('admin/metrics/', admin_dashboard_metrics, name='admin-metrics'),
    
    # Health and Monitoring
    path('health/', health_check, name='health-check'),
    path('metrics/', metrics_view, name='metrics-view'),
    path('version/', version_view, name='version-view'),
    
    # API Documentation
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # Router
    path('', include(router.urls)),
]
