from django.contrib import admin
from django.contrib.admin import ModelAdmin

from order.models import Order


@admin.register(Order)
class OrderAdmin(ModelAdmin):
    search_fields = ("email", "phone_number")
    list_display = ("email", "phone_number", "created_at", "total")

