from rest_framework import serializers

from order.models import Order
from shop.serializers import ProductSerializer


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
