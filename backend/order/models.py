from decimal import Decimal

from django.conf import settings
from django.core.validators import RegexValidator
from django.db import models

from shop.models import Product


class Order(models.Model):
    email = models.EmailField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                r"^\d{10}$",
                message="Make sure your phone number consists of 10 digits"
            )
        ]
    )

    region = models.CharField(
        max_length=65, blank=True, null=True, choices=settings.REGIONS_DICT.items()
    )
    city = models.CharField(
        max_length=255, blank=True, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self) -> str:
        return f"{self.email}, {self.created_at}"


class OrderItem(models.Model):
    objects = None
    product = models.ForeignKey(
        "shop.Product", on_delete=models.CASCADE, related_name="order_items"
    )
    quantity = models.PositiveIntegerField(default=1)
    order = models.ForeignKey(
        Order,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="order_items"
    )

    def calculate_total(self) -> Decimal:
        return self.product.price * self.quantity

    def __str__(self) -> str:
        return f"{self.product}, quantity = {self.quantity}"
