from django.urls import path

from .views import api_automobile_vos, api_sales_persons, api_sales_person, api_potential_customers, api_potential_customer, api_sales, api_sale

urlpatterns = [
    path("sales_persons/", api_sales_persons, name="api_sales_persons"),
    path("sales_persons/<int:pk>/", api_sales_person, name="api_sales_person"),
    path("potential_customers/", api_potential_customers, name="api_potential_customers"),
    path("potential_customers/<int:pk>/", api_potential_customer, name="api_potential_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
    path("automobile_vos/", api_automobile_vos, name="api_automobile_vos"),
]