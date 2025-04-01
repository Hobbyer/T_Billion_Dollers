def run():
    import RPi.GPIO as GPIO
    import board
    import adafruit_dht as DHT
    import time

    # GPIO setup
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.cleanup()

    sensor = DHT.DHT22(board.D10)
    LED_PIN = 4
    GPIO.setup(LED_PIN, GPIO.OUT)
    GPIO.output(LED_PIN, GPIO.LOW)

    print("Monitoring DHT22 sensor...")
    time.sleep(2)

    while True:
        try:
            temperature = sensor.temperature
            humidity = sensor.humidity

            print(f"Temperature: {temperature:.1f}°C | Humidity: {humidity:.1f}%")

            if temperature < 0 or temperature > 25:
                print("Temperature out of range! Blinking LED.")
                GPIO.output(LED_PIN, GPIO.HIGH)
                time.sleep(0.5)
                GPIO.output(LED_PIN, GPIO.LOW)
                time.sleep(0.5)
            else:
                GPIO.output(LED_PIN, GPIO.LOW)
                time.sleep(1)

        except RuntimeError as e:
            print(f"Sensor read error: {e.args[0]}")
            time.sleep(2)
