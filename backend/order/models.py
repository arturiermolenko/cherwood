from decimal import Decimal

from django.conf import settings
from django.db import models

from shop.models import Product


class Order(models.Model):
    email = models.EmailField(max_length=255)
    products = models.ManyToManyField(Product, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self) -> str:
        return f"{self.email}, {self.created_at}"
