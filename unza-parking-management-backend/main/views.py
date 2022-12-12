
from webbrowser import get
from rest_framework import generics,filters
from django.contrib.auth import get_user_model
from main.serializers import GateEntriesSerializers,UserListSerializer,ApproveUserSerializer,VehicleSerializer,EditUserSerializer,GateControlSerializer,CarParkSerializer,SetParkSerializer
from .models import GateEntries,CarRegister,GateState,CarPark, StudentCarPark

# Create your views here.
class GateEntriesView(generics.ListAPIView):
    queryset = GateEntries.objects.all()
    serializer_class = GateEntriesSerializers

class CreateGateEntry(generics.CreateAPIView):
    queryset = GateEntries.objects.all()
    serializer_class = GateEntriesSerializers

class UserList(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserListSerializer

class UnApprovedUserList(generics.ListAPIView):
    serializer_class = UserListSerializer
    def get_queryset(self):
      is_approved = self.kwargs['is_approved']
      return get_user_model().objects.filter(is_approved=is_approved)
    filter_backends = [filters.SearchFilter]
    search_fields = ('name','idNumber',)

class UserDetail(generics.RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserListSerializer

class ApproveUser(generics.UpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = ApproveUserSerializer

class VehicleView(generics.ListAPIView):
    queryset = CarRegister.objects.all()
    serializer_class = VehicleSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ('numberPlate','model',)

class User(generics.RetrieveAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserListSerializer
    lookup_field = 'email'

class AddVehicle(generics.CreateAPIView):
    queryset = CarRegister.objects.all()
    serializer_class = VehicleSerializer

class VehicleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CarRegister.objects.all()
    serializer_class = VehicleSerializer

class EditUserDetail(generics.RetrieveUpdateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = EditUserSerializer

class GateControlView(generics.RetrieveUpdateAPIView):
    queryset = GateState.objects.all()
    serializer_class = GateControlSerializer

class CarParkView(generics.RetrieveUpdateAPIView):
    queryset = CarPark.objects.all()
    serializer_class = CarParkSerializer

class SetPark(generics.RetrieveUpdateAPIView):
    queryset = StudentCarPark.objects.all()
    serializer_class = SetParkSerializer