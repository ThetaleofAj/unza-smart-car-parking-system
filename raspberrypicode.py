import keyboard
import requests
from pprint import pprint
from picamera import PiCamera
from time import sleep
import os
import serial
import time
import RPi.GPIO as GPIO
import json
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(18,GPIO.OUT)
GPIO.setup(17,GPIO.OUT)
registeredPlates = [{'id':'1','plate':'abp456'},
                    {'id':'2','plate':'abp578'},
                    {'id':'3','plate':'abp4135'},
                    {'id':'4','plate':'baa3919'},
                    {'id':'5','plate':'abc124'}]
val=''
if os.path.exists('/dev/rfcomm0') == False:
    #print('hello')
    path = 'sudo rfcomm bind 00:20:10:08:40:65'
    os.system(path)
    time.sleep(1)
   
#bluetoothSerial = serial.Serial('/dev/rfcomm0', baudrate=9600)
#RXData = bluetoothSerial.readline()
print("Waiting on data from Arduino: ")
isGateOpen = False;
n = True
try:
    while n:
        bluetoothSerial = serial.Serial('/dev/rfcomm0', baudrate=9600)
        RXData = (bluetoothSerial.readline()).strip().decode("utf-8")
        val = RXData
        gateGate = requests.get('https://andyson2.pythonanywhere.com/api/carPark/1/')
        data1 = gateGate.text
        parse_json1 = json.loads(data1)
        info2 = parse_json1['carpark']
        gateState = requests.get('https://andyson2.pythonanywhere.com/api/gateControl/1/')
        data = gateState.text
        parse_json = json.loads(data)
        info = parse_json['state']
        print(val)
       # print(info)
       # print(info2)
        if val=='2':
            print('Taking picture...')
            camera = PiCamera()
            camera.rotation = 180
            camera.resolution=(1920,1080)
            camera.start_preview()
            sleep(5)
            camera.capture('/home/pi/Downloads/image.jpg')
            camera.stop_preview()
            camera.close()
            print('Picture taken. Processing image..')
            regions = ['zm'] # Change to your country
            with open('/home/pi/Downloads/nissan.jpg', 'rb') as fp:
                response = requests.post(
                    'https://api.platerecognizer.com/v1/plate-reader/',
                    #'http://localhost:8080/v1/plate-reader/',
                    data=dict(regions=regions),  # Optional
                    files=dict(upload=fp),
                    headers={'Authorization': 'Token 9f6fdfaa8a1ce4542f52e7429fc2cdfdb4de7c8b'})
            result = response.json()
            newPlate = result['results'][0]['plate']
            thislist = []
            for plate in registeredPlates:
                thislist.append(plate['plate'])
               
            if newPlate in thislist:
                print('Open Gate')
                GPIO.output(18,GPIO.HIGH)
                GPIO.output(17,GPIO.LOW)
                time.sleep(2)
                GPIO.output(18,GPIO.LOW)
                GPIO.output(17,GPIO.LOW)
                parkLink = requests.get('https://andyson2.pythonanywhere.com/api/setPark/'+ info2 + '/')
                print('step1')
                data2 = parkLink.text
                print('step2')
                parse_json2 = json.loads(data2)
                print('step3')
                info3 = parse_json2['slots']
                print('step3')
                num = info3 + 1
                print(num)
                myrtn = {'id':info2,'slots':num}
                print('step5')
                newLink = 'https://andyson2.pythonanywhere.com/api/setPark/'+ str(info2) + '/'
                print('step6')
                y = requests.put(newLink,json=myrtn)
                print('step7')
                url = 'https://andyson2.pythonanywhere.com/api/createGateEntries/'
                myobj = {'numberPlate':newPlate}
                x = requests.post(url,json=myobj)
                print(x.text)
                isGateOpen = True
                while isGateOpen == True:
                    RupData = (bluetoothSerial.readline()).strip().decode("utf-8")
                    print(RupData)
                    if RupData == '0':
                        GPIO.output(18,GPIO.LOW)
                        GPIO.output(17,GPIO.HIGH)
                        time.sleep(2)
                        GPIO.output(18,GPIO.LOW)
                        GPIO.output(17,GPIO.LOW)
                        isGateOpen = False
                        print('closed')
                        break
           
            else:
                print('Car not registered!')
             
        elif info == '1':
            print('open gate')
            GPIO.output(18,GPIO.HIGH)
            GPIO.output(17,GPIO.LOW)
            time.sleep(1)
            GPIO.output(18,GPIO.LOW)
            GPIO.output(17,GPIO.LOW)
            link = 'https://andyson2.pythonanywhere.com/api/gateControl/1/'
            myobj = {'id':1,'state': '0'}
            x = requests.put(link,json=myobj)
           
        elif info == '2':
            print('close gate')
            GPIO.output(18,GPIO.LOW)
            GPIO.output(17,GPIO.HIGH)
            time.sleep(0.6)
            GPIO.output(18,GPIO.LOW)
            GPIO.output(17,GPIO.LOW)
            link = 'https://andyson2.pythonanywhere.com/api/gateControl/1/'
            myobj = {'id':1,'state': '0'}
            x = requests.put(link,json=myobj)


