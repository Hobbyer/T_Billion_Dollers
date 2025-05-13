# -------------------------------
# 센서 및 DB 연동 기반 IoT 제어 서버
# Raspberry Pi + Flask + MySQL
# -------------------------------

import threading  # 스레드 사용을 위한 모듈
import time        # 시간 제어를 위한 모듈
import RPi.GPIO as GPIO  # 라즈베리파이 GPIO 제어
import board       # 보드 핀 지정용
import adafruit_dht as DHT  # 온습도 센서 라이브러리
import pymysql     # MySQL 연동 모듈
from flask import Flask, jsonify, request  # Flask 웹서버 모듈

# 공유 데이터 변수: 온도, 습도
shared_data = {
    'temperature': None,
    'humidity': None
}

# 센서 동작 제어 변수
sensor_running = True
motion_running = True

# GPIO 핀 정의
TEMP_LED = 4  # 온도 경고 LED 핀
sensor = DHT.DHT22(board.D10)  # DHT22 온습도 센서 (GPIO 10)
FAN_PIN = 19  # 팬 출력 핀
LED_GREEN = 20  # 모션 없을 때 켜지는 LED
LED_YELLOW = 21  # 모션 감지시 켜지는 LED
PIR_SENSOR = 17  # 모션 감지 센서 입력 핀
CLAXON = 18  # 부저 출력 핀

# 부저 음계 설정
notes = {
    'do': 262, 'le':294, 'mi': 330, 'pa': 349,
    'sol': 392, 'ra': 440, 'si': 493, 'do2': 523, '-': 0
}

# 모션 감지 시 재생할 멜로디
MELODY = [330, 294, 262, 294, 330, 330, 330, 294, 294, 294, 330, 330, 330, 330, 294, 262, 294, 330, 330, 330, 294, 294, 294]
BEEP_DURATION = 0.3  # 각 음의 재생 시간 (초)

# DB 연결 리스트 (Railway 서버만 사용 중)
host_list = [
    {'host': 'shinkansen.proxy.rlwy.net', 'port': 39333, 'user': 'root',
     'password': 'PXLhoLXGwohEkyRTcmMUdQFGWexNCCtD', 'database': 'railway', 'charset': 'utf8'}
]

# GPIO 초기 설정
GPIO.setwarnings(False)  # 경고 메시지 비활성화
GPIO.setmode(GPIO.BCM)   # BCM 모드 설정 (핀 번호)
GPIO.setup(TEMP_LED, GPIO.OUT)  # 온도 LED 출력 설정
GPIO.setup(LED_GREEN, GPIO.OUT)  # 모션 LED GREEN
GPIO.setup(LED_YELLOW, GPIO.OUT) # 모션 LED YELLOW
GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # PIR 센서 입력
GPIO.setup(CLAXON, GPIO.OUT)  # 부저 출력
GPIO.setup(FAN_PIN, GPIO.OUT)  # 팬 출력
GPIO.output(FAN_PIN, GPIO.LOW)  # 팬 초기 OFF

# 부저 PWM 객체 생성
buzzer = GPIO.PWM(CLAXON, 100)

# -----------------------
# DHT22 온습도 측정 루프
# -----------------------
def dht22_loop():
    global sensor_running
    time.sleep(5)  # 초기 대기
    while True:
        if sensor_running:
            try:
                # 센서에서 온습도 값 읽기
                temp = sensor.temperature
                humidity = sensor.humidity
                # 공유 변수에 저장
                shared_data['temperature'] = temp
                shared_data['humidity'] = humidity

                # 온도 임계값 판단하여 LED 깜빡이기
                if temp < 0 or temp > 25:
                    GPIO.output(TEMP_LED, GPIO.HIGH)
                    time.sleep(0.5)
                    GPIO.output(TEMP_LED, GPIO.LOW)
                    time.sleep(0.5)
                else:
                    GPIO.output(TEMP_LED, GPIO.LOW)
                    time.sleep(1)
            except RuntimeError:
                time.sleep(3)  # 에러 시 잠시 대기
        else:
            time.sleep(1)  # 센서 비활성화 상태일 경우 대기

# -----------------------
# 온도 기준 팬 제어 루프
# -----------------------
def fan_loop():
    fan_on = False
    while True:
        temp = shared_data["temperature"]
        if temp is not None:
            if temp > 25.1 and not fan_on:
                GPIO.output(FAN_PIN, GPIO.HIGH)  # 팬 ON
                fan_on = True
            elif temp <= 22.0 and fan_on:
                GPIO.output(FAN_PIN, GPIO.LOW)  # 팬 OFF
                fan_on = False
        time.sleep(2)  # 2초마다 체크

# -----------------------
# 모션 감지 루프
# -----------------------
def motion_loop():
    global motion_running
    time.sleep(2)
    while True:
        if motion_running:
            motion_detected = GPIO.input(PIR_SENSOR)
            if motion_detected:
                # 모션 감지 시 LED 및 부저 동작
                GPIO.output(LED_YELLOW, GPIO.HIGH)
                GPIO.output(LED_GREEN, GPIO.LOW)
                buzzer.start(50)
                for note in MELODY:
                    buzzer.ChangeFrequency(note)
                    time.sleep(BEEP_DURATION)
                buzzer.stop()

                # 감지 로그 DB에 저장
                for host_info in host_list:
                    try:
                        conn = pymysql.connect(**host_info)
                        with conn.cursor() as cursor:
                            query = "INSERT INTO motion_data (TIME_LINE, MOTION) VALUES (CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul'), %s)"
                            cursor.execute(query, ('DETECTED',))
                            conn.commit()
                    except Exception as e:
                        print(f"[DB] Fail: {e}")
                    finally:
                        try:
                            cursor.close()
                            conn.close()
                        except:
                            pass
            else:
                # 모션 없을 경우
                GPIO.output(LED_GREEN, GPIO.HIGH)
                GPIO.output(LED_YELLOW, GPIO.LOW)
                buzzer.stop()
        else:
            # 모션 센서 비활성화 상태일 때
            GPIO.output(LED_GREEN, GPIO.LOW)
            GPIO.output(LED_YELLOW, GPIO.LOW)
            buzzer.stop()
            time.sleep(0.3)

        time.sleep(0.3)

# -----------------------
# 환경 데이터 DB 저장 루프
# -----------------------
def db_saving_loop():
    while True:
        temp = shared_data.get('temperature')
        humidity = shared_data.get('humidity')
        if temp is not None and humidity is not None:
            for host_info in host_list:
                try:
                    conn = pymysql.connect(**host_info)
                    with conn.cursor() as cursor:
                        query = f"INSERT INTO environment_data (TEMP, HUMIDITY, TIME_LINE) VALUES ({temp}, {humidity}, CONVERT_TZ(NOW(), 'UTC', 'Asia/Seoul'))"
                        cursor.execute(query)
                        conn.commit()
                except:
                    pass
                finally:
                    try:
                        cursor.close()
                        conn.close()
                    except:
                        pass
        time.sleep(30)  # 30초마다 저장

# -----------------------
# Flask 웹서버 API 정의
# -----------------------
app = Flask(__name__)

# 온습도 데이터 조회 API
@app.route('/sensor/environment', methods=['GET'])
def get_environment():
    return jsonify({
        'temperature': shared_data.get('temperature'),
        'humidity': shared_data.get('humidity')
    })

# 센서 On/Off 제어 API
@app.route('/sensor/toggle', methods=['POST'])
def toggle_sensor():
    global sensor_running, motion_running
    data = request.get_json()

    if 'sensor' in data:
        sensor_running = data['sensor']
    if 'motion' in data:
        motion_running = data['motion']

    return jsonify({
        "sensor_running": sensor_running,
        "motion_running": motion_running
    }), 200

# -----------------------
# 메인 실행 루틴
# -----------------------
if __name__ == "__main__":
    try:
        # 모든 기능을 쓰레드로 병렬 실행
        threads = [
            threading.Thread(target=dht22_loop, daemon=True),
            threading.Thread(target=motion_loop, daemon=True),
            threading.Thread(target=db_saving_loop, daemon=True),
            threading.Thread(target=fan_loop, daemon=True)
        ]

        for t in threads:
            t.start()  # 각 쓰레드 시작

        app.run(host='0.0.0.0', port=5000)  # Flask 서버 실행

    except KeyboardInterrupt:
        GPIO.cleanup()  # 강제 종료 시 GPIO 초기화
