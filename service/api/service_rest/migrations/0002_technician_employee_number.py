# Generated by Django 4.0.3 on 2022-06-19 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='technician',
            name='employee_number',
            field=models.IntegerField(null=True, unique=True),
        ),
    ]
