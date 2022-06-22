from django.db import models
from django.urls import reverse

# Create your models here.

class SalesPerson(models.Model):
    employee_name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.employee_name

class PotentialCustomer(models.Model):
    customer_name = models.CharField(max_length=100)
    customer_address = models.CharField(max_length=100)
    customer_phone_number = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("api_potential_customer", kwargs={"pk": self.id})
    
    def __str__(self):
        return self.customer_name