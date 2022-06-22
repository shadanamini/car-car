from common.json import ModelEncoder
from .models import SalesPerson, PotentialCustomer

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "employee_name",
        "employee_number",
    ]

class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = [
        "customer_name",
        "customer_address",
        "customer_phone_number",
    ]