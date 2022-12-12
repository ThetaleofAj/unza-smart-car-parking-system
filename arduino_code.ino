#include<SoftwareSerial.h>
long duration; // variable for the duration of sound wave travel
int distance; 
const int buzzer = 7;
const int trigPin = 12;
const int echoPin = 11;
int RX_pin=10;
int TX_pin=9;
SoftwareSerial BTserial(RX_pin,TX_pin);
int ledPin = 13;
int ultraPin = 4;
int figure = 1;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // // Serial Communication is starting with 9600 of baudrate speed
  BTserial.begin(9600);
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an OUTPUT
  pinMode(echoPin, INPUT); // Sets the echoPin as an INPUT
  pinMode(ledPin, OUTPUT); 
  pinMode(ultraPin, OUTPUT);  
  pinMode(RX_pin, INPUT);
  pinMode(TX_pin, OUTPUT);
  //pinMode(buzzer, OUTPUT);
  Serial.println("Ultrasonic Sensor HC-SR04 Test"); // print some text in Serial Monitor
  Serial.println("with Arduino UNO R3");
   digitalWrite(ultraPin, HIGH); 

}

void loop() {
  // put your main code here, to run repeatedly:
  // Clears the trigPin condition
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  // Calculating the distance
  distance = duration * 0.034 / 2; // Speed of sound wave divided by 2 (go and back)
  // Displays the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  static bool runOnce = false;
 
   
  if(distance<85){
    digitalWrite(ledPin,HIGH);
  //  Serial.println(figure);
 //    BTserial.println(figure);
     Serial.println('2');
     BTserial.println('2');
     if(figure==1){
     tone(buzzer, 1000);
      delay(1000);        
      noTone(buzzer);   
      delay(1000);  
     }
   // delay(1000);
    figure++;
    
  }else{
    Serial.println('0');
    BTserial.println('0');
     digitalWrite(ledPin,LOW);
     figure = 1;
    // delay(2000);
  }
  delay(650);
}
