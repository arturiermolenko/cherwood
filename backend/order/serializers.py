from rest_framework import serializers

from order.models import Order


class OrderCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = Order
        fields = ("email", "first_name", "last_name", "phone_number")


class OrderListSerializer(serializers.ModelSerializer):
    order_items = serializers.StringRelatedField(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "total",
            "created_at",
            "order_items"
        )
