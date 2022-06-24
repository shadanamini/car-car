from django.db import models
from django.urls import reverse


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


class AutoMobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})
    
    def __str__(self):
        return str(self.vin) + ' ' + str(self.id)

class Sales(models.Model):
    automobile = models.ForeignKey(
        AutoMobileVO,
        related_name="automobile",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="salesperson",
        on_delete=models.CASCADE
    )
    potentialcustomer = models.ForeignKey(
        PotentialCustomer,
        related_name="potentialcustomer",
        on_delete=models.CASCADE
    )
    salesprice = models.PositiveSmallIntegerField()