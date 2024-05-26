# weather_data_fetcher.py : 기상청 API로부터 기상정보 가져오는 코드
import requests
from .models import WeatherDB

serviceKey = "jZcdVZ5YMpdaFa4%2BlIznbFws5VhTJeWZ9UvVY2LKXK0DIBlQnQt2kkjvbt5lZhdvCrbkLk6BH9jVIz%2BDTTw0NA%3D%3D" # 본인의 서비스 키 입력
# --> 날씨를 알고 싶은 시간 입력
base_date = '20240525' # 발표 일자
base_time = '0700' # 발표 시간
nx = '62' # 예보 지점 x좌표
ny = '123' # 예보 지점 y좌표

def fetch_and_store_weather_data():
    # url로 API return값 요청
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params ={'serviceKey' : serviceKey, \
             'pageNo' : '1', \
             'numOfRows' : '1000', \
             'dataType' : 'JSON', \
             'base_date' : base_date, \
             'base_time' : base_time, \
             'nx' : nx, \
             'ny' : ny }

    if now.minute<45: # base_time와 base_date 구하는 함수
        if now.hour==0:
            base_time = "2330"
            base_date = yesterday
        else:
            pre_hour = now.hour-1
            if pre_hour<10:
                base_time = "0" + str(pre_hour) + "30"
            else:
                base_time = str(pre_hour) + "30"
            base_date = today
    else:
        if now.hour < 10:
            base_time = "0" + str(now.hour) + "30"
        else:
            base_time = str(now.hour) + "30"
        base_date = today

    response = requests.get(url, params, verify=False)
    res = response.json().get('response').get('body').get('items')
    data = dict()
    data['data'] = base_date

    weather_data = dict()

    # store in database
    for item in items['item']:
        # 기온
        if item['category'] == 'T1H':
            weather_data['tmp'] = item['fcstValue']
        # 습도
        if item['category'] == 'REH':
            weather_data['hum'] = item['fcstValue']
        # 하늘상태: 맑음(1) 구름많은(3) 흐림(4)
        if item['category'] == 'SKY':
            weather_data['sky'] = item['fcstValue']
        # 1시간 동안 강수량
        if item['category'] == 'RN1':
            weather_data['rain'] = item['fcstValue']
