import RPi.GPIO as GPIO 
import board
import adafruit_dht as DHT
import time


def run():
    # GPIO setup
    GPIO.setwarnings(False) # GPIO 경고를 비활성화합니다.
    GPIO.setmode(GPIO.BCM) # GPIO 핀 번호를 BCM 모드로 설정합니다.
    GPIO.cleanup() # GPIO 핀을 초기화합니다.

    sensor = DHT.DHT22(board.D10) # DHT22 센서 핀 번호를 설정합니다.
    LED_PIN = 4 # LED 핀 번호를 설정합니다.
    GPIO.setup(LED_PIN, GPIO.OUT) # LED 핀을 출력 모드로 설정합니다.
    GPIO.output(LED_PIN, GPIO.LOW) # LED를 끕니다.

    print("Monitoring DHT22 sensor...")
    time.sleep(2)

    while True:
        try:
            temperature = sensor.temperature # 온도를 읽습니다.
            humidity = sensor.humidity # 습도를 읽습니다.

            print(f"Temperature: {temperature:.1f}°C | Humidity: {humidity:.1f}%") # 온도와 습도를 출력합니다.

            if temperature < 0 or temperature > 25: # 온도가 0도 이하 또는 25도 이상인 경우
                print("Temperature out of range! Blinking LED.") # 경고 메시지를 출력합니다.
                GPIO.output(LED_PIN, GPIO.HIGH) # LED를 켭니다.
                time.sleep(0.5) # 0.5초 대기합니다.
                GPIO.output(LED_PIN, GPIO.LOW) # LED를 끕니다.
                time.sleep(0.5) # 0.5초 대기합니다.
            else:
                GPIO.output(LED_PIN, GPIO.LOW) # LED를 끕니다.
                time.sleep(1) # 1초 대기합니다.

        except RuntimeError as e: # 센서 읽기 오류가 발생한 경우
            print(f"Sensor read error: {e.args[0]}") # 오류 메시지를 출력합니다.
            time.sleep(2) # 2초 대기합니다.
