def run():
    import RPi.GPIO as GPIO
    from time import sleep

    LED_GREEN = 20 # LED_GREEN 핀 번호를 20으로 설정합니다.
    LED_YELLOW = 21 # LED_YELLOW 핀 번호를 21으로 설정합니다.
    PIR_SENSOR = 17 # PIR_SENSOR 핀 번호를 17으로 설정합니다.
    CLAXON = 18 # CLAXON 핀 번호를 18으로 설정합니다.

    MELODY = [262, 294, 330, 349, 392, 440, 493, 523] # 멜로디 주파수 설정
    BEEP_DURATION = 0.5 # 비프 지속 시간 설정

    GPIO.setwarnings(False) # GPIO 경고를 비활성화합니다.
    GPIO.setmode(GPIO.BCM) # GPIO 핀 번호를 BCM 모드로 설정합니다.

    GPIO.setup(LED_GREEN, GPIO.OUT) # LED_GREEN 핀을 출력 모드로 설정합니다.
    GPIO.setup(LED_YELLOW, GPIO.OUT) # LED_YELLOW 핀을 출력 모드로 설정합니다.
    GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # PIR_SENSOR 핀을 입력 모드로 설정합니다.
    GPIO.setup(CLAXON, GPIO.OUT) # CLAXON 핀을 출력 모드로 설정합니다.

    buzzer = GPIO.PWM(CLAXON, 100) # PWM을 사용하여 CLAXON 핀을 설정합니다.

    print("PIR sensor ready.")
    sleep(5)

    while True:
        motion_detected = GPIO.input(PIR_SENSOR) # PIR 센서에서 모션 감지 여부를 읽습니다.

        if motion_detected: # 모션이 감지된 경우
            print("Motion Detected!")
            GPIO.output(LED_YELLOW, GPIO.HIGH) # LED_YELLOW를 켭니다.
            GPIO.output(LED_GREEN, GPIO.LOW) # LED_GREEN을 끕니다.

            buzzer.start(10) # PWM 시작
            for note in MELODY: # 멜로디를 재생합니다.
                buzzer.ChangeFrequency(note) # 주파수 변경
                sleep(BEEP_DURATION) # 비프 지속 시간만큼 대기합니다.
            buzzer.stop()
        else: # 모션이 감지되지 않은 경우
            GPIO.output(LED_GREEN, GPIO.HIGH) # LED_GREEN을 켭니다.
            GPIO.output(LED_YELLOW, GPIO.LOW) # LED_YELLOW을 끕니다.
            buzzer.stop() # PWM 정지

        sleep(0.3) # 0.3초 대기합니다.
