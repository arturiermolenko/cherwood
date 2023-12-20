from rest_framework import serializers

from shop.models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "image")


class CategoryListSerializer(CategorySerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "image")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("image",)


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "price",
            "description",
            "length",
            "width",
            "height",
            "material",
            "coating",
            "additional_info",
            "category_name",
            "main_image",
        )


class ProductListSerializer(ProductSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "price", "category_name")


class ProductDetailSerializer(ProductSerializer):
    images = ProductImageSerializer(many=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "price",
            "description",
            "length",
            "width",
            "height",
            "material",
            "coating",
            "additional_info",
            "category_name",
            "main_image",
            "images",
        )


class CategoryDetailSerializer(CategorySerializer):
    products = ProductListSerializer(many=True)

    class Meta:
        model = Category
        fields = ("products",)
