from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import CarPark, GateEntries,CarRegister,GateState, StudentCarPark
from django.contrib.auth import get_user_model

class GateEntriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = GateEntries
        fields = ('id','image','numberPlate','timeStamp',)

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarRegister
        fields = ('id','owner','image','numberPlate','model','color',)

class UserListSerializer(serializers.ModelSerializer):
    carregister = VehicleSerializer(many=True)
    class Meta:
        model = get_user_model()
        fields = ('id','email','name','idNumber','status','nrcNumber','cellNumber','is_approved','carregister',)
    
class ApproveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('is_approved',)

class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','name','idNumber','status','nrcNumber','cellNumber',)

class GateControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = GateState
        fields = ('id','state',)

class CarParkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPark
        fields = ('id','carpark',)

class SetParkSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCarPark
        fields = ('id','slots',)