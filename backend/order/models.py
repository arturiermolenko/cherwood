from decimal import Decimal

from django.conf import settings
from django.db import models

from shop.models import Product


class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="orders"
    )
    products = models.ManyToManyField(Product, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_total(self) -> Decimal:
        return sum(product.price for product in self.products)

    def __str__(self) -> str:
        return str(self.created_at)
