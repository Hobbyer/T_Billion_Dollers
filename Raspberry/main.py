import threading 
import time
import RPi.GPIO as GPIO
import board
import adafruit_dht as DHT
import pymysql

# ------------------------------
# Global shared variables
# ------------------------------
shared_data = {
    'temperature': None,
    'humidity': None
}

# ------------------------------
# GPIO PIN 설정
# ------------------------------
TEMP_LED = 4 # 온도 LED 핀 번호
sensor = DHT.DHT22(board.D10) # DHT22 센서 핀 번호

# FAN 제어용 핀 추가
FAN_PIN = 19
GPIO.setup(FAN_PIN, GPIO.OUT)
GPIO.output(FAN_PIN, GPIO.LOW)

LED_GREEN = 20 # LED_GREEN 핀 번호
LED_YELLOW = 21 # LED_YELLOW 핀 번호
PIR_SENSOR = 17 # PIR_SENSOR 핀 번호
CLAXON = 18 # CLAXON 핀 번호

MELODY = [262, 294, 330, 349, 392, 440, 493, 523] # 멜로디 주파수 설정
BEEP_DURATION = 0.5 # 비프 지속 시간 설정

# ------------------------------
# DB 접속 정보
# ------------------------------
host_list = [
    {'host': '192.168.30.76', 'user': 'moneymany_user', 'password': 'manymoney', 'database': 'moneymany', 'charset': 'utf8'},
    {'host': '192.168.30.151', 'user': 'moneymany_user', 'password': 'manymoney', 'database': 'moneymany', 'charset': 'utf8'},
    {'host': '192.168.30.95', 'user': 'moneymany_user', 'password': 'manymoney', 'database': 'moneymany', 'charset': 'utf8'}
]

# ------------------------------
# GPIO 초기화
# ------------------------------
GPIO.setwarnings(False) # GPIO 경고를 비활성화합니다.
GPIO.setmode(GPIO.BCM) # GPIO 핀 번호를 BCM 모드로 설정합니다.
GPIO.setup(TEMP_LED, GPIO.OUT) # 온도 LED 핀을 출력 모드로 설정합니다.
GPIO.setup(LED_GREEN, GPIO.OUT) # LED_GREEN 핀을 출력 모드로 설정합니다.
GPIO.setup(LED_YELLOW, GPIO.OUT) # LED_YELLOW 핀을 출력 모드로 설정합니다.
GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # PIR_SENSOR 핀을 입력 모드로 설정합니다.
GPIO.setup(CLAXON, GPIO.OUT) # CLAXON 핀을 출력 모드로 설정합니다.

buzzer = GPIO.PWM(CLAXON, 100) # PWM을 사용하여 CLAXON 핀을 설정합니다.

# ------------------------------
# DHT22 센서 루프
# ------------------------------
def dht22_loop():
    print("[DHT22] Sensor thread started.")
    while True:
        try:
            temp = sensor.temperature # 온도를 읽습니다.
            humidity = sensor.humidity # 습도를 읽습니다.

            shared_data['temperature'] = temp # 온도 데이터를 공유 변수에 저장합니다.
            shared_data['humidity'] = humidity # 습도 데이터를 공유 변수에 저장합니다.

            print(f"[DHT22] Temp: {temp:.1f}°C | Humidity: {humidity:.1f}%") # 온도와 습도를 출력합니다.

            if temp < 0 or temp > 25: # 온도가 0도 이하 또는 25도 이상인 경우
                GPIO.output(TEMP_LED, GPIO.HIGH) # 온도 LED를 켭니다.
                time.sleep(0.5) # 0.5초 대기합니다.
                GPIO.output(TEMP_LED, GPIO.LOW) # 온도 LED를 끕니다.
                time.sleep(0.5) # 0.5초 대기합니다.
            else: # 온도가 정상 범위인 경우
                GPIO.output(TEMP_LED, GPIO.LOW) # 온도 LED를 끕니다.
                time.sleep(1) # 1초 대기합니다.

        except RuntimeError as e: # 센서 읽기 오류가 발생한 경우
            print(f"[DHT22] Sensor read error: {e.args[0]}") # 오류 메시지를 출력합니다.
            time.sleep(2) # 2초 대기합니다.

# ------------------------------
# FAN 제어 루프 (온도 기준)
# ------------------------------
FAN_PIN = 19  # 팬 제어용 핀 번호
GPIO.setup(FAN_PIN, GPIO.OUT)
GPIO.output(FAN_PIN, GPIO.LOW)

def fan_loop():
    print("[Fan] Fan control thread started.")
    fan_on = False

    while True:
        temp = shared_data.get('temperature')

        if temp is not None:
            if temp > 25.1 and not fan_on:
                print(f"[Fan] Temp {temp:.1f}°C > 25.1 → Fan ON")
                GPIO.output(FAN_PIN, GPIO.HIGH)
                fan_on = True

            elif temp <= 22.0 and fan_on:
                print(f"[Fan] Temp {temp:.1f}°C ≤ 22.0 → Fan OFF")
                GPIO.output(FAN_PIN, GPIO.LOW)
                fan_on = False

        time.sleep(2)

# ------------------------------
# PIR 모션 루프
# ------------------------------
def motion_loop():
    print("[Motion] Sensor thread started.")
    time.sleep(2)

    while True:
        motion_detected = GPIO.input(PIR_SENSOR) # PIR 센서에서 모션 감지 여부를 읽습니다.

        if motion_detected: # 모션이 감지된 경우
            print("[Motion] Motion Detected!")
            GPIO.output(LED_YELLOW, GPIO.HIGH) # LED_YELLOW를 켭니다.
            GPIO.output(LED_GREEN, GPIO.LOW) # LED_GREEN을 끕니다.

            buzzer.start(10) # PWM 시작
            for note in MELODY: # 멜로디를 재생합니다.
                buzzer.ChangeFrequency(note) # 주파수 변경
                time.sleep(BEEP_DURATION) # 비프 지속 시간만큼 대기합니다.
            buzzer.stop()
        else:
            GPIO.output(LED_GREEN, GPIO.HIGH) # LED_GREEN을 켭니다.
            GPIO.output(LED_YELLOW, GPIO.LOW) # LED_YELLOW을 끕니다.
            buzzer.stop() # PWM 정지

        time.sleep(0.3) # 0.3초 대기합니다.

# ------------------------------
# DB 저장 루프 (30초마다 실행)
# ------------------------------
def db_saving_loop():
    print("[DB] Database saving thread started.")
    while True:
        temp = shared_data.get('temperature') # 온도 데이터를 가져옵니다.
        humidity = shared_data.get('humidity') # 습도 데이터를 가져옵니다.

        if temp is not None and humidity is not None: # 온도와 습도 데이터가 모두 존재하는 경우
            for host_info in host_list: # 각 DB 호스트에 대해 반복합니다.
                try:
                    conn = pymysql.connect(**host_info) # DB에 연결합니다.
                    with conn.cursor() as cursor:
                        query = f"INSERT INTO environment_data (TEMP, HUMIDITY) VALUES ({temp}, {humidity})" # 쿼리 작성
                        cursor.execute(query) # 쿼리 실행
                        conn.commit() # 변경사항 커밋
                    print(f"[DB] Data inserted to {host_info['host']}") 
                except pymysql.Error as e: # DB 오류가 발생한 경우
                    print(f"[DB] Error connecting to {host_info['host']}: {e}") # 오류 메시지를 출력합니다.
                finally: # DB 연결을 종료합니다.
                    try: 
                        cursor.close() # 커서를 닫습니다.
                        conn.close() # DB 연결을 닫습니다.
                    except: 
                        pass
        else:
            print("[DB] No sensor data to insert yet.")

        time.sleep(30) # 30초 대기합니다.

# ------------------------------
# Main
# ------------------------------
if __name__ == "__main__": # 메인 스레드에서 실행되는 경우
    print("[Main] Starting all threads...")

    try:
        threads = [
        threading.Thread(target=dht22_loop, daemon=True),
        threading.Thread(target=motion_loop, daemon=True),
        threading.Thread(target=db_saving_loop, daemon=True),
        threading.Thread(target=fan_loop, daemon=True),  # 팬 제어 스레드 추가
    ]

        for t in threads: # 각 스레드를 시작합니다.
            t.start() 

        while True: # 메인 스레드에서 무한 루프를 실행합니다.
            time.sleep(1) # 1초 대기합니다.

    except KeyboardInterrupt: # Ctrl+C로 프로그램을 종료하는 경우
        print("\n[Main] Program terminated by user.") # 종료 메시지를 출력합니다.
        GPIO.cleanup() # GPIO 핀을 정리합니다.
