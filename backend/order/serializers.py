from django.conf import settings
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from order.models import Order


class OrderCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    region = serializers.CharField(max_length=65)

    class Meta:
        model = Order
        fields = (
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "region",
            "city"
        )

    def validate_region(self, value):
        region_dict = settings.REGIONS_DICT
        if value in list(region_dict.keys()):
            return value
        elif value in list(region_dict.values()):
            position = list(region_dict.values()).index(value)
            return list(region_dict.keys())[position]
        raise ValidationError(f"{value} is not a possible choice.")


class OrderListSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True, format="%d/%m/%Y, %H:%M:%S")

    class Meta:
        model = Order
        fields = (
            "id",
            "total",
            "created_at",
            "order_items"
        )
