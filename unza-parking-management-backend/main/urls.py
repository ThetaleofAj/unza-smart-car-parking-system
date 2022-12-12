from django.urls import path,re_path

from main.models import CarPark
from .views import CreateGateEntry,GateEntriesView,UserList,UnApprovedUserList,UserDetail,ApproveUser,VehicleView,User,AddVehicle,VehicleDetail,EditUserDetail,GateControlView,CarParkView,SetPark

urlpatterns = [
    path('gateEntries/',GateEntriesView.as_view()),
    path('createGateEntries/',CreateGateEntry.as_view()),
    path('userList/',UserList.as_view()),
    re_path('unapprovedUserList/(?P<is_approved>.+)/$',UnApprovedUserList.as_view()),
    path('userDetail/<int:pk>/',UserDetail.as_view()),
    path('approveUser/<int:pk>/',ApproveUser.as_view()),
    path('vehicles/',VehicleView.as_view()),
    path('user/<email>/',User.as_view()),
    path('addVehicle/',AddVehicle.as_view()),
    path('vehicleDetail/<int:pk>/',VehicleDetail.as_view()),
    path('editUserDetail/<int:pk>/',EditUserDetail.as_view()),
    path('gateControl/<int:pk>/',GateControlView.as_view()),
    path('carPark/<int:pk>/',CarParkView.as_view()),
    path('setPark/<int:pk>/',SetPark.as_view()),

]

