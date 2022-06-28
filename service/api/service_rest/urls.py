from django.urls import path

from .views import api_technicians, api_technician, api_appointments, api_appointment, api_finish_appointment, api_cancel_appointment, api_service_history

urlpatterns = [
    path("technicians/", api_technicians, name="api_technicians"),
    path("technicians/<int:pk>/", api_technician, name="api_technician"),
    path("appointments/", api_appointments, name="api_appointments"),
    path("appointments/<int:pk>/", api_appointment, name="api_appointment"),
    path("appointments/<int:pk>/cancelled", api_cancel_appointment, name= "api_cancel_appointment"),
    path("appointments/<int:pk>/finished", api_finish_appointment, name="api_finish_appointment"),
    path("appointments/<str:vin>", api_service_history, name="api_service_history"),
]