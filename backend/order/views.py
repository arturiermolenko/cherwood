from rest_framework import generics

from order.models import Order
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
        order.products.set(product_ids)
        subject = "Order Created"
        text = (f"Order {order.id} has been created successfully on {order.created_at}.\n"
                f"Items: ")
        for product in order.products.all():
            text += f"\n - {product} x {cart.cart[str(product.id)]['quantity']}"
        text += f"\nTotal: {cart.get_total_price()}"
        from_email = "cherwood@gmail.com"
        send_email(order.email, from_email, text, subject)
