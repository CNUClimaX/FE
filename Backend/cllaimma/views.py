from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import WeatherDB
from .serializers import WeatherDBSerializer

class WeatherDataList(generics.ListAPIView):
    queryset = WeatherDB.objects.all()
    serializer_class = WeatherDBSerializer

class WeatherSaveView(APIView):
    def get(self, request):
        buildings = Building.objects.all()
        for building in buildings:
            nx, ny = mapToGrid(building.lat, building.lon) # 이함수는 저번 포스트를 보면 알수 있다. 위도와 경도를 사용해서 기상청 예보에 맞는 x,y로 바꿔주는 함수 이다.
            data = check_weather(nx, ny)
            weather = WeatherDB.objects.get(id)
            weather.temp = data['tmp']
            weather.humidity = data['hum']
            weather.rainType = data['rain']
            weather.sky = data['sky']
            weather.save() #필수
        serializer = WeatherDBSerializer(weather)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

