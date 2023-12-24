from rest_framework import serializers

from shop.models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "image", "subcategories")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("image",)


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "price",
            "description",
            "length",
            "width",
            "height",
            "material",
            "coating",
            "additional_info",
            "category",
            "subcategory",
            "main_image",
            "images"
        )
