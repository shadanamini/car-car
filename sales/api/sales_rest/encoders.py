from common.json import ModelEncoder
from .models import Sales, SalesPerson, PotentialCustomer, AutoMobileVO

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

class AutoMobileVOEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "id",
        "import_href",
        "vin",
    ]

class SalesEncoder(ModelEncoder):
    model = Sales
    properties = [
        "automobile",
        "salesperson",
        "potentialcustomer",
        "salesprice",
    ]