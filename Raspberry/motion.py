def run():
    import RPi.GPIO as GPIO
    from time import sleep

    LED_GREEN = 20
    LED_YELLOW = 21
    PIR_SENSOR = 17
    CLAXON = 18

    MELODY = [262, 294, 330, 349, 392, 440, 493, 523]
    BEEP_DURATION = 0.5

    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)

    GPIO.setup(LED_GREEN, GPIO.OUT)
    GPIO.setup(LED_YELLOW, GPIO.OUT)
    GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.setup(CLAXON, GPIO.OUT)

    buzzer = GPIO.PWM(CLAXON, 100)

    print("PIR sensor ready.")
    sleep(5)

    while True:
        motion_detected = GPIO.input(PIR_SENSOR)

        if motion_detected:
            print("Motion Detected!")
            GPIO.output(LED_YELLOW, GPIO.HIGH)
            GPIO.output(LED_GREEN, GPIO.LOW)

            buzzer.start(10)
            for note in MELODY:
                buzzer.ChangeFrequency(note)
                sleep(BEEP_DURATION)
            buzzer.stop()
        else:
            GPIO.output(LED_GREEN, GPIO.HIGH)
            GPIO.output(LED_YELLOW, GPIO.LOW)
            buzzer.stop()

        sleep(0.3)
