from rest_framework import viewsets

from .models import Class, ClassType, Tier
from .serializers import ClassSerializer, ClassTypeSerializer, TierSerializer

class TierViewSet(viewsets.ModelViewSet):
    queryset = Tier.objects.all()
    serializer_class = TierSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer

class ClassTypeViewSet(viewsets.ModelViewSet):
    queryset = ClassType.objects.all()
    serializer_class = ClassTypeSerializer
