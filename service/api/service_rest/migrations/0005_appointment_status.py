# Generated by Django 4.0.3 on 2022-06-22 01:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_status_alter_appointment_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='appointments', to='service_rest.status'),
        ),
    ]
