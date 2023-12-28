from django.contrib import admin

from .models import Category, Product, ProductImage, Subcategory


class ProductImageInline(admin.TabularInline):
    model = ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("name",)
    search_fields = ("name",)


@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category")
    list_display_links = ("name",)
    list_filter = ("category",)
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "subcategory")
    inlines = [ProductImageInline]
    list_display_links = ("name",)
    list_filter = ("category", "subcategory", "material")
    search_fields = ("name",)
