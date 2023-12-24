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
            "name_eng",
            "price",
            "description",
            "description_eng",
            "length",
            "width",
            "height",
            "material",
            "material_eng",
            "coating",
            "coating_eng",
            "additional_info",
            "additional_info_eng",
            "category",
            "subcategory",
            "main_image",
            "images"
        )
