# fetch_weather_data.py : 기상청API로부터 정보 가져오기
from django.core.management.base import BaseCommand
from weather_data_fetcher import fetch_and_store_weather_data

class Command(BaseCommand):
    help = 'Fetch weather data from API and store in database'

    def handle(self, *args, **kwargs):
        fetch_and_store_weather_data()
        self.stdout.write(self.style.SUCCESS('Successfully fetched and stored weather data'))
