from django.conf import settings
from django.test import TestCase

from shop.models import Product, Category, Subcategory
from shop.services import Cart


class CartTests(TestCase):
    """
    Unauthenticated user`s cart tests
    """

    def setUp(self):
        self.request = self.client.request().wsgi_request
        self.category = Category.objects.create(name="Test Category")
        self.subcategory = Subcategory.objects.create(
            name="Test Subcategory", category=self.category
        )
        self.product = Product.objects.create(
            name="Test Product",
            price=100,
            length=30,
            width=30,
            height=30,
            category=self.category,
            subcategory=self.subcategory,
        )

    def test_cart_init(self):
        """
        Initialization unauthenticated user`s cart without existing cart
        """
        self.assertNotIn(settings.CART_SESSION_ID, self.request.session)
        cart_instance = Cart(self.request)

        self.assertEqual(cart_instance.cart, {})

    def test_add_product_to_cart(self):
        """
        Test adding product to cart
        """
        cart_instance = Cart(self.request)
        cart_instance.add(self.product.id)

        cart = {self.product.id: {"quantity": 1, "price": "100.00"}}

        self.assertEqual(cart_instance.cart, cart)
        cart_instance.clear()

    def test_remove_one_product_from_cart(self):
        """
        Test that we can remove one piece of product
        """
        cart_instance = Cart(self.request)
        cart_instance.add(self.product.id)
        cart_instance.add(self.product.id)
        cart_instance.remove_one(self.product.id)

        cart = {self.product.id: {"quantity": 1, "price": "100.00"}}

        self.assertEqual(cart_instance.cart, cart)
        cart_instance.clear()

    def test_remove_item_from_cart(self):
        """
        Test that we can remove an item from the cart
        """
        cart_instance = Cart(self.request)
        cart_instance.add(self.product.id)
        cart_instance.add(self.product.id)
        cart_instance.remove_item(self.product.id)

        self.assertEqual(cart_instance.cart, {})
        cart_instance.clear()

    def test_get_all(self):
        """
        Test necessary fields are added to cart products
        """
        cart_instance = Cart(self.request)
        cart_instance.add(self.product.id)
        cart_instance.get_all()
        cart_items = "{1: {'quantity': 1, 'price': Decimal('100.00'), 'id': 1, 'total_price': Decimal('100.00')}}"

        self.assertEqual(str(cart_instance.cart), cart_items)
        cart_instance.clear()

    def test_get_total_price(self):
        """
        Test get_total_price method of cart products
        """
        cart_instance = Cart(self.request)
        cart_instance.add(self.product.id)
        cart_instance.add(self.product.id)
        self.assertEqual(cart_instance.get_total_price(), 200.00)
        cart_instance.clear()

    def test_clear_cart(self):
        """
        Test cart clearing
        """
        cart_instance = Cart(self.request)
        cart_instance.add(self.product.id)
        cart_instance.add(self.product.id)

        cart_instance.clear()

        self.assertEqual(cart_instance.session.get(settings.CART_SESSION_ID), {})
