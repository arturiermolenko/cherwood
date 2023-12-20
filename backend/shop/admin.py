from django.contrib import admin

from .models import Category, Product, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "length",
        "width",
        "height",
        "material",
        "coating",
        "additional_info",
    )
    list_filter = ("name", "material", "coating")
    search_fields = ("name",)


admin.site.register(ProductImage)
