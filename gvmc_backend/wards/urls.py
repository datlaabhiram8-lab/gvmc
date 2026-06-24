from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WardViewSet, SustainabilityFeedbackViewSet, ComplaintViewSet, AuthLoginView

router = DefaultRouter()
router.register(r'wards', WardViewSet, basename='ward')
router.register(r'sustainability', SustainabilityFeedbackViewSet, basename='sustainability')
router.register(r'complaints', ComplaintViewSet, basename='complaint')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', AuthLoginView.as_view(), name='auth-login'),
]
