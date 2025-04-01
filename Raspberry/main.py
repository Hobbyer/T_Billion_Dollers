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
TEMP_LED = 4
sensor = DHT.DHT22(board.D10)

LED_GREEN = 20
LED_YELLOW = 21
PIR_SENSOR = 17
CLAXON = 18

MELODY = [262, 294, 330, 349, 392, 440, 493, 523]
BEEP_DURATION = 0.5

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
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(TEMP_LED, GPIO.OUT)
GPIO.setup(LED_GREEN, GPIO.OUT)
GPIO.setup(LED_YELLOW, GPIO.OUT)
GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(CLAXON, GPIO.OUT)

buzzer = GPIO.PWM(CLAXON, 100)

# ------------------------------
# DHT22 센서 루프
# ------------------------------
def dht22_loop():
    print("[DHT22] Sensor thread started.")
    while True:
        try:
            temp = sensor.temperature
            humidity = sensor.humidity

            shared_data['temperature'] = temp
            shared_data['humidity'] = humidity

            print(f"[DHT22] Temp: {temp:.1f}°C | Humidity: {humidity:.1f}%")

            if temp < 0 or temp > 25:
                GPIO.output(TEMP_LED, GPIO.HIGH)
                time.sleep(0.5)
                GPIO.output(TEMP_LED, GPIO.LOW)
                time.sleep(0.5)
            else:
                GPIO.output(TEMP_LED, GPIO.LOW)
                time.sleep(1)

        except RuntimeError as e:
            print(f"[DHT22] Sensor read error: {e.args[0]}")
            time.sleep(2)

# ------------------------------
# PIR 모션 루프
# ------------------------------
def motion_loop():
    print("[Motion] Sensor thread started.")
    time.sleep(2)

    while True:
        motion_detected = GPIO.input(PIR_SENSOR)

        if motion_detected:
            print("[Motion] Motion Detected!")
            GPIO.output(LED_YELLOW, GPIO.HIGH)
            GPIO.output(LED_GREEN, GPIO.LOW)

            buzzer.start(10)
            for note in MELODY:
                buzzer.ChangeFrequency(note)
                time.sleep(BEEP_DURATION)
            buzzer.stop()
        else:
            GPIO.output(LED_GREEN, GPIO.HIGH)
            GPIO.output(LED_YELLOW, GPIO.LOW)
            buzzer.stop()

        time.sleep(0.3)

# ------------------------------
# DB 저장 루프 (30초마다 실행)
# ------------------------------
def db_saving_loop():
    print("[DB] Database saving thread started.")
    while True:
        temp = shared_data.get('temperature')
        humidity = shared_data.get('humidity')

        if temp is not None and humidity is not None:
            for host_info in host_list:
                try:
                    conn = pymysql.connect(**host_info)
                    with conn.cursor() as cursor:
                        query = f"INSERT INTO environment_data (TEMP, HUMIDITY) VALUES ({temp}, {humidity})"
                        cursor.execute(query)
                        conn.commit()
                    print(f"[DB] Data inserted to {host_info['host']}")
                except pymysql.Error as e:
                    print(f"[DB] Error connecting to {host_info['host']}: {e}")
                finally:
                    try:
                        cursor.close()
                        conn.close()
                    except:
                        pass
        else:
            print("[DB] No sensor data to insert yet.")

        time.sleep(30)

# ------------------------------
# Main
# ------------------------------
if __name__ == "__main__":
    print("[Main] Starting all threads...")

    try:
        threads = [
            threading.Thread(target=dht22_loop, daemon=True),
            threading.Thread(target=motion_loop, daemon=True),
            threading.Thread(target=db_saving_loop, daemon=True)
        ]

        for t in threads:
            t.start()

        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n[Main] Program terminated by user.")
        GPIO.cleanup()
