import os
import uuid

from django.db import models
from django.db.models import CharField


def file_path(instance, filename, suffix, folder) -> str:
    _, ext = os.path.splitext(filename)
    filename = f"{suffix}-{uuid.uuid4()}{ext}"
    return os.path.join(f"uploads/images/{folder}", filename)


def category_image_file_path(instance, filename) -> str:
    return file_path(instance, filename, instance.name, "categories")


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    image = models.ImageField(null=True, upload_to=category_image_file_path)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()
    length = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    material = models.CharField(max_length=255)
    coating = models.CharField(max_length=255)
    additional_info = models.CharField(max_length=500)
    category = models.ForeignKey(
        "Category",
        on_delete=models.CASCADE,
        related_name="products"
    )

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name


def product_image_file_path(instance, filename) -> str:
    return file_path(instance, filename, instance.product.name, "products")


class ProductImage(models.Model):
    image = models.ImageField(upload_to=product_image_file_path)
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, related_name="images"
    )
