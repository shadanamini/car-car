from django.contrib import admin
from .models import Appointment, Status, Technician

admin.site.register(Status)
admin.site.register(Appointment)
admin.site.register(Technician)