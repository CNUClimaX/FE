# models.py : database 정의

from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# weather info 저장될 class 구성\
class WeatherDB(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now=True, null=True, blank=True)
    temp = models.IntegerField(blank=True, null=True) #온도
    humidity = models.IntegerField(blank=True, null=True) #습도
    rainType = models.CharField(max_length=20, blank=True, null=True) #한시간 동안 강수량
    sky = models.IntegerField(blank=True, null=True) # 하늘 상태

    def __str__(self):
        return str(self.id) + " - " + str(self.timestamp)

