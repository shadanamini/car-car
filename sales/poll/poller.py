import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()


from sales_rest.models import AutoMobileVO

def get_autos():
    response = requests.get("http://inventory-api:8000/api/automobiles")
    content = json.loads(response.content)
    for auto in content["autos"]:
        AutoMobileVO.objects.update_or_create(
            import_href=auto['href'],
            defaults={
                'vin': auto['vin'],
            },
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_autos()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
