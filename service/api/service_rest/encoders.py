from common.json import ModelEncoder
from .models import Status, Technician, Appointment, AutomobileVO
import json

class AutoMobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "import_href",
        "vin",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "employee_name",
        "employee_number",
    ]

class StatusEncoder(ModelEncoder):
    model = Status
    properties = [
        "id",
        "name",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "date",
        "time",
        "reason",
        "technician",
        "status",   
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        "status": StatusEncoder()
    }

    def get_extra_data(self, o):
        count = AutomobileVO.objects.filter(vin=o.vin).count()
        return {"vip": count > 0}
