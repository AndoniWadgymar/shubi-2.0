from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassViewSet, ClassTypeViewSet, TierViewSet

router = DefaultRouter()
router.register(r'classes', ClassViewSet, basename='class')
router.register(r'classtype', ClassTypeViewSet, basename='classtype')
router.register(r'tier', TierViewSet, basename='tier')

urlpatterns = [
    path('', include(router.urls)),
]
