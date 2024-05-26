# urls.py : url 관리
from django.urls import path
from .views import WeatherDataList

urlpatterns = [
    path('', WeatherDataList.as_view(), name='weather-data-list'),
]

