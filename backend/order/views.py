from rest_framework import generics

from order.models import Order, OrderItem
from order.serializers import OrderCreateSerializer
from order.services import send_email
from shop.services import Cart


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all()
    permission_classes = []
    authentication_classes = []

    def perform_create(self, serializer):
        cart = Cart(self.request)
        order = serializer.save(total=cart.get_total_price())
        product_ids = cart.cart.keys()
        for i in product_ids:
            OrderItem.objects.create(
                order=order, product_id=i, quantity=cart.cart[i]["quantity"]
            )
        send_email(order)

