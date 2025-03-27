from time import sleep
import Adafruit_BMP.BMP085 as BMP085
import pandas as pd

import pymysql.cursors

import RPi.GPIO as GPIO


###### temp, pressure, altitude ######
sensor = BMP085.BMP085(busnum=1)

cnt = 1

data = {
    "timeLine" : [],
    "temp" : [],
    "pressure" : [],
    "altitude" : []
  }


host_list = [
    {'host' : '192.168.30.76', 'user' : 'moneymany_user', 'password' : 'manymoney', 'database' : 'moneymany', 'charset' : 'utf8'},
    {'host' : '192.168.30.151', 'user' : 'moneymany_user', 'password' : 'manymoney', 'database' : 'moneymany', 'charset' : 'utf8'},
    {'host' : '192.168.30.95', 'user' : 'moneymany_user', 'password' : 'manymoney', 'database' : 'moneymany', 'charset' : 'utf8'}
]


### MariaDB connect ###
def temp_db_save():
   for host_info in host_list:

      try:
        # MariaDB connet
        conn = pymysql.connect(**host_info)
            
        # DB USE (query_execute)
        with conn.cursor() as cursor:
          insert_query = f"INSERT INTO environment_data (TEMP) VALUES ({temp})"
          cursor.execute(insert_query)
  
          conn.commit()
   
      except pymysql.Error as e:
        print(f"Error connecting to {host_info['host']}: {e}")

      finally:
        if conn:
          cursor.close()
          conn.close()


### LED setting ###
GPIO.setmode(GPIO.BOARD)

LED = 7

GPIO.setup(LED, GPIO.OUT, initial=GPIO.LOW)


def led_operate():    

    GPIO.output(LED, GPIO.HIGH)
    sleep(0.5)


    GPIO.output(LED, GPIO.LOW)
    sleep(0.5)



while True:  

  temp = sensor.read_temperature()
  # pressure = sensor.read_raw_pressure()
  # ALTitude = sensor.read_altitude()

  print(f'temp = {temp}')
  # print(f'pressure = {pressure}')
  # print(f'altitude = {ALTitude}')  

  cnt = cnt + 1

  time_cnt = 0

  if cnt % 6 == 0:
    temp_db_save()

  while (temp >= 32.1 or temp <0) :
    led_operate()

    temp = sensor.read_temperature()
    # pressure = sensor.read_raw_pressure()
    # ALTitude = sensor.read_altitude()

    time_cnt = time_cnt + 1

    if time_cnt == 30:
      temp_db_save()

    elif time_cnt == 10:
      print(f'temp = {temp}')
      # print(f'pressure = {pressure}')
      # print(f'altitude = {ALTitude}')
    
    else:
      pass

  # GPIO.cleanup()
       
  sleep(5)