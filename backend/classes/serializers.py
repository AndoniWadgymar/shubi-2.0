from rest_framework import serializers
from .models import Class, ClassType, Tier

class TierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tier
        fields = '__all__'

class ClassTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassType
        fields = '__all__'

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'
