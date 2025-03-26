from time import sleep
import Adafruit_BMP.BMP085 as BMP085
import pandas as pd
import datetime
import pytz
import mysql.connector


sensor = BMP085.BMP085(busnum=1)

cnt = 1

data = {
    "timeLine" : [],
    "temp" : [],
    "pressure" : [],
    "altitude" : []
  }
 

while True:
 
  if cnt % 3 == 0: # 30초마다 데이터를 저장
    # MariaDB 占쏙옙占쏙옙 占쏙옙占쏙옙
    conn = mysql.connector.connect(
    host='192.168.30.76', # 호스트 주소 : 내가 사용하는 컴퓨터 IP주소로 지정해줘야함
    user='moneymany_user',
    password='moneymany',
    database='moneymany',
    charset='utf8'
    )

    # 커서 생성
    cursor = conn.cursor()

    # 실행할 쿼리
    insert_query = f"INSERT INTO environment_data (TEMP) VALUES ({temp})"
        # cursor.execute(insert_query, (korea_time.strftime('%Y-%m-%d %H:%M:%S'),))
    cursor.execute(insert_query)

    # 커밋   
    conn.commit()

    # 연결 종료
    cursor.close()
    conn.close()
    

  cnt = cnt + 1

  temp = sensor.read_temperature()
  # pressure = sensor.read_raw_pressure()
  # ALTitude = sensor.read_altitude()

  print(f'temp = {temp}')
  # print(f'pressure = {pressure}')
  # print(f'altitude = {ALTitude}')

  # korea_tz = pytz.timezone('Asia/Seoul')

  # korea_time = datetime.datetime.now(korea_tz)

  # current_time = korea_time.strftime('%Y-%m-%d %H:%M:%S')

       
  sleep(10)