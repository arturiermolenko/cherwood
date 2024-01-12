import os
import uuid

from django.conf import settings
from django.db import models


def file_path(instance, filename, suffix, folder) -> str:
    _, ext = os.path.splitext(filename)
    filename = f"{suffix}-{uuid.uuid4()}{ext}"
    return os.path.join(f"uploads/images/{folder}", filename)


def category_image_file_path(instance, filename) -> str:
    return file_path(instance, filename, instance.name, "categories")


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    name_eng = models.CharField(max_length=255, unique=True)
    image = models.ImageField(null=True, upload_to=category_image_file_path)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self) -> str:
        return self.name


def subcategory_image_file_path(instance, filename) -> str:
    return file_path(instance, filename, instance.name, "subcategories")


class Subcategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    name_eng = models.CharField(max_length=255, unique=True)
    image = models.ImageField(null=True, upload_to=subcategory_image_file_path)
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, related_name="subcategories"
    )

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "subcategories"

    def __str__(self) -> str:
        return f"{self.name}({self.category})"


def product_main_image_file_path(instance, filename) -> str:
    return file_path(instance, filename, f"main_{instance.name}", "products")


class Product(models.Model):
    name = models.CharField(max_length=255, unique=True)
    name_eng = models.CharField(max_length=255, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    description_eng = models.TextField()
    length = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    material = models.CharField(max_length=255)
    material_eng = models.CharField(max_length=255)
    buying_with_it = models.ManyToManyField("self", blank=True, symmetrical=False)
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, related_name="products"
    )
    subcategory = models.ForeignKey(
        "Subcategory", on_delete=models.CASCADE, related_name="products"
    )
    main_image = models.ImageField(upload_to=product_main_image_file_path)

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
