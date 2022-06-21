from django.db import models
from django.urls import reverse


class Technician(models.Model):
    employee_name = models.CharField(max_length=100, unique=True)
    employee_number = models.IntegerField(unique=True, null=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.employee_name


class Appointment(models.Model):
    vin = models.CharField(max_length=100, unique=True)
    customer_name = models.CharField(max_length=100)
    date = models.DateField(null=True)
    time = models.TimeField(auto_now=False, auto_now_add=False, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.vin 

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})
    
    def __str__(self):
        return self.vin 





