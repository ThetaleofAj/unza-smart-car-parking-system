from email.policy import default
from unittest.util import _MAX_LENGTH
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from .managers import CustomUserManager
from django.conf import settings

# Create your models here.
class CustomUser(AbstractUser):
   email = models.CharField(_('email address'),max_length=254, unique=True)
   name = models.CharField(max_length=100,null=True)
   idNumber = models.CharField(max_length=100,null=True)
   status = models.CharField(max_length=100,null=True)
   nrcNumber = models.CharField(max_length=100,null=True)
   cellNumber = models.CharField(max_length=100,null=True)
   is_approved = models.BooleanField(default=False)

   USERNAME_FIELD = 'email'
   REQUIRED_FIELDS = []

   objects = CustomUserManager()

   def __str__(self):
        return self.email

class CarRegister(models.Model):
        owner = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,related_name='carregister')
        image = models.ImageField(upload_to='images/',blank=True)
        numberPlate = models.CharField(max_length=100,null=True)
        status = models.CharField(max_length=100,null=True)
        model = models.CharField(max_length=100,null=True)
        color = models.CharField(max_length=100,null=True)

class GateEntries(models.Model):
        image = models.ImageField(upload_to='images/',blank=True)
        numberPlate = models.CharField(max_length=100,null=True)
        timeStamp = models.DateTimeField(auto_now_add=True,auto_now=False)

class GateState(models.Model):
        #1/Open and #2/Close
        state = models.CharField(max_length=10,null=True,default='0')
        
class CarPark(models.Model):
        #1 Student #2 Staff #3 Guest
        carpark = models.CharField(max_length=10,null=True)

class StudentCarPark(models.Model):
        slots = models.IntegerField(default=0)