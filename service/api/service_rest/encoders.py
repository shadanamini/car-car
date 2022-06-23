from common.json import ModelEncoder
from .models import Technician, Appointment, AutoMobileVO
import json

class AutoMobileVOEncoder(ModelEncoder):
    model = AutoMobileVO
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
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        count = AutoMobileVO.objects.filter(vin=o.vin).count()
        return {"vip": count > 0}
