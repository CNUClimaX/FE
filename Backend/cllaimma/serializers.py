# serializers.py : Django에서 저장된 데이터를 반환하는 API 엔드포인트 설정
from rest_framework import serializers
from .models import WeatherDB

class WeatherDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherDB
        fields = '__all__'

