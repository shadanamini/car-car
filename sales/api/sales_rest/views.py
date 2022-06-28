import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import AutoMobileVOEncoder, SalesPersonEncoder, PotentialCustomerEncoder, SalesEncoder
from .models import AutoMobileVO, SalesPerson, PotentialCustomer, Sales

@require_http_methods(["GET", "POST"])
def api_sales_persons(request):
    if request.method == "GET":
        salespersons = SalesPerson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalesPersonEncoder,
        )
    else:
            content = json.loads(request.body)
            salespersons = SalesPerson.objects.create(**content)
            return JsonResponse(
                salespersons,
                encoder=SalesPersonEncoder,
                safe=False,
            )

@require_http_methods(["DELETE", "GET"])
def api_sales_person(request, pk):
    if request.method == "GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

    
@require_http_methods(["GET", "POST"])
def api_potential_customers(request):
    if request.method == "GET":
        potentialcustomers = PotentialCustomer.objects.all()
        return JsonResponse(
            {"potentialcustomers": potentialcustomers},
            encoder=PotentialCustomerEncoder,
            safe=False,
        )
    else:
            content = json.loads(request.body)
            potentialcustomers = PotentialCustomer.objects.create(**content)
            return JsonResponse(
                potentialcustomers,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_potential_customer(request, pk):
    if request.method == "GET":
        try:
            potentialcustomer = PotentialCustomer.objects.get(id=pk)
            return JsonResponse(
                potentialcustomer,
                encoder=PotentialCustomerEncoder,
                safe=False
            )
        except PotentialCustomer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            potentialcustomer = PotentialCustomer.objects.get(id=pk)
            PotentialCustomer.delete(self=potentialcustomer)
            return JsonResponse(
                potentialcustomer,
                encoder=PotentialCustomerEncoder,
                safe=False,
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sales.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder,
            safe=False,
        )
    else:
            content = json.loads(request.body)
            automobile_id = content["automobile"]
            automobile = AutoMobileVO.objects.get(id=automobile_id)
            content["automobile"] = automobile
            sales = Sales.objects.create(**content)
            return JsonResponse(
                sales,
                encoder=SalesEncoder,
                safe=False,
            )

@require_http_methods(["DELETE", "GET"])
def api_sale(request, pk):
    if request.method == "GET":
        try:
            sale = Sales.objects.get(id=pk)
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False
            )
        except Sales.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
            sale = Sales.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except Sales.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})

@require_http_methods(["GET"])
def api_sales_history(request, sale):
    sales = Sales.objects.filter(sales=sales)
    return JsonResponse(
        sales,
        encoder=SalesEncoder,
        safe=False,
    )

@require_http_methods(["GET"])
def api_automobile_vos(request):
    automobile_vos = AutoMobileVO.objects.all()
    return JsonResponse(
        automobile_vos,
        encoder = AutoMobileVOEncoder,
        safe=False,
    )