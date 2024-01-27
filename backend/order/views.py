from rest_framework import generics
from rest_framework.exceptions import ValidationError

from order.models import Order, OrderItem
from order.serializers import OrderCreateSerializer
from order.tasks import send_email
from shop.services import Cart


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all()
    permission_classes = []
    authentication_classes = []

    def perform_create(self, serializer):
        cart = Cart(self.request)
        if not list(cart.cart.keys()):
            raise ValidationError("Put something in your cart please.")
        order = serializer.save(total=cart.get_total_price())
        product_ids = cart.cart.keys()
        for product_id in product_ids:
            OrderItem.objects.create(
                order=order,
                product_id=product_id,
                quantity=cart.cart[product_id]["quantity"]
            )
        send_email.delay(order.id)
        cart.clear()
