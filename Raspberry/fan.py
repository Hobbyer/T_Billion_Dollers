import RPi.GPIO as GPIO
from time import sleep

FAN_PIN = 19 # 占쏙옙 占쏙옙 占쏙옙호

GPIO.setmode(GPIO.BCM) # GPIO 占쏙옙 占쏙옙호占쏙옙 BCM 占쏙옙占쏙옙 占쏙옙占쏙옙占쌌니댐옙.
GPIO.setwarnings(False) # GPIO 占쏙옙占쏙옙占?占쏙옙활占쏙옙화占쌌니댐옙.
GPIO.setup(FAN_PIN, GPIO.OUT) # 占쏙옙 占쏙옙占쏙옙 占쏙옙占?占쏙옙占쏙옙 占쏙옙占쏙옙占쌌니댐옙.

print("Fan On")
GPIO.output(FAN_PIN, GPIO.HIGH) # 占쏙옙占쏙옙 占쌌니댐옙.
sleep(30) # 5占쏙옙 占쏙옙占쏙옙爛求占?

print("Fan Off")
GPIO.output(FAN_PIN, GPIO.LOW) # 占쏙옙占쏙옙 占쏙옙占싹댐옙.

GPIO.cleanup() # GPIO 占쏙옙占쏙옙 占쏙옙占쏙옙占쌌니댐옙.