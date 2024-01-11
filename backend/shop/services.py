import smtplib
from decimal import Decimal

from django.conf import settings

from .serializers import ProductSerializer
from .models import Product


def send_email(recipient: str | list[str], author: str, text: str, subject: str) -> None:
    TO = recipient if isinstance(recipient, list) else [recipient]
    FROM = author
    message = """From: %s\nTo: %s\nSubject: %s\n\n%s
        """ % (FROM, ", ".join(TO), subject, text)
    server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
    server.ehlo()
    server.starttls()
    server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
    server.sendmail(FROM, TO, message)
    server.close()


class Cart:
    def __init__(self, request):
        """
        Initialize the cart
        """
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            # save an empty cart in session
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart

    def save(self):
        self.session.modified = True

    def add(
            self,
            product_id: str,
    ):
        """
        Add product to the cart or add one item to cart
        """

        product = Product.objects.get(id=product_id)
        if product_id not in self.cart:
            self.cart[product_id] = {
                "quantity": 1,
                "price": str(product.price)
            }
        else:
            self.cart[product_id]["quantity"] += 1
        self.save()

    def remove_one(self, product_id: str):
        """
        Remove 1 item of product from the cart
        """
        self.cart[product_id]["quantity"] -= 1
        self.save()

    def remove_item(self, product_id: str):
        """
        Remove a product from the cart
        """
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def get_all(self):
        """
        Add necessary fields to cart products
        :return: dict of all products in the cart
        """
        for key, value in self.cart.items():
            value["id"] = int(key)
            value["price"] = Decimal(value["price"])
            value["total_price"] = value["price"] * value["quantity"]
        return self.cart.values()

    def get_total_price(self):
        """
        Count total price for products in the cart
        """
        return sum(
            Decimal(item["price"]) * item["quantity"] for item in self.cart.values()
        )

    def clear(self):
        """
        Remove cart from session
        """
        del self.session[settings.CART_SESSION_ID]
        self.save()
