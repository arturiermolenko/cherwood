from rest_framework import serializers

from shop.models import Category, Product, ProductImage, Subcategory, Order


class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ["name", "name_eng"]


class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubcategorySerializer(read_only=True, many=True)

    class Meta:
        model = Category
        fields = ("id", "name", "name_eng", "subcategories")


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("image",)


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(read_only=True, many=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_name_eng = serializers.CharField(
        source="category.name_eng", read_only=True
    )
    subcategory_name = serializers.CharField(source="subcategory.name", read_only=True)
    subcategory_name_eng = serializers.CharField(
        source="subcategory.name_eng", read_only=True
    )

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
            "category_name",
            "category_name_eng",
            "subcategory_name",
            "subcategory_name_eng",
            "buying_with_it",
            "main_image",
            "images",
        )


class OrderCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Order
        fields = ("email",)


class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id", "email", "total", "created_at")


class OrderDetailSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ("id", "email", "total", "created_at", "products")
