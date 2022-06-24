from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    TechnicianEncoder,
    AppointmentEncoder,
)

from .models import Appointment, Technician


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        # try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )

@require_http_methods(["DELETE", "GET"])
def api_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else: #DELETE
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
    else:
        # try:
            content = json.loads(request.body)
            technician_id = content["technician"]        
            technician = Technician.objects.get(id=technician_id)
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        # except IntegrityError:
        #     response = JsonResponse(
        #         {"message": "Matching VIN vehicle is already scheduled for service"}
        #     )
            
        #     response.status_code = 400
        #     return response


@require_http_methods(["DELETE", "GET"])
def api_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else: #"DELETE"
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.cancel()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.finish()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )

@require_http_methods(["GET"])
def api_service_history(request, vin):
    appointment = Appointment.objects.filter(vin=vin)
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False,
    )
    
