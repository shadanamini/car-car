from django.db import models
from django.urls import reverse

class Status(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("id",)  
        verbose_name_plural = "statuses"  


class Technician(models.Model):
    employee_name = models.CharField(max_length=100)
    employee_number = models.IntegerField(null=True)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.employee_name


class Appointment(models.Model):
    @classmethod
    def create(cls, **kwargs):
        kwargs["status"] = Status.objects.get(name="SCHEDULED")
        appointment = cls(**kwargs)
        appointment.save()
        return appointment

    vin = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=100)
    date = models.DateField(null=True)
    time = models.TimeField(auto_now=False, auto_now_add=False, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )
    reason = models.CharField(max_length=200)
    status = models.ForeignKey(
        Status,
        related_name = "appointments",
        on_delete=models.PROTECT,
        default=1,
    )

    def cancel(self):
        status = Status.objects.get(name="CANCELLED")
        self.status = status
        self.save()
    
    def finish(self):
        status = Status.objects.get(name="FINISHED")
        self.status = status
        self.save()

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.vin 
    
    class Meta:
        ordering = ("vin",)

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})
    
    def __str__(self):
        return self.vin 





