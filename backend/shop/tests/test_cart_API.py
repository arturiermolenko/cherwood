from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from shop.models import Product, Category, Subcategory

BASE_URL = reverse("shop:cart")


class CartAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
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

    def test_get_cart(self):
        """
        Test cart get API request
        """
        response = self.client.get(BASE_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_add_product(self):
        """
        Test cart add product API request
        """
        payload = {
            "product_id": self.product.id,
            "action": "add"
        }
        response = self.client.post(BASE_URL, payload)

        response_data = {"message": "cart updated"}
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data, response_data)

        get_response_data = ("{'products': dict_values"
                             "([{'quantity': 1, 'price': Decimal('100.00'),"
                             " 'id': 1, 'total_price': Decimal('100.00')}]),"
                             " 'cart_total_price': Decimal('100.00')}")
        get_response = self.client.get(BASE_URL)
        self.assertEqual(str(get_response.data), get_response_data)

    def test_post_remove_one_product(self):
        """
        Test cart remove one product API request
        """
        add_payload = {
            "product_id": self.product.id,
            "action": "add"
        }
        self.client.post(BASE_URL, add_payload)
        self.client.post(BASE_URL, add_payload)

        payload = {
            "product_id": self.product.id,
            "action": "remove_one"
        }
        response = self.client.post(BASE_URL, payload)

        response_data = {"message": "cart updated"}
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data, response_data)

        get_response_data = ("{'products': dict_values(["
                             "{'quantity': 1, 'price': Decimal('100.00'), 'id': 1,"
                             " 'total_price': Decimal('100.00')}]),"
                             " 'cart_total_price': Decimal('100.00')}")

        get_response = self.client.get(BASE_URL)
        self.assertEqual(str(get_response.data), get_response_data)

    def test_post_remove_item(self):
        """
        Test cart remove item from cart API request
        """
        add_payload = {
            "product_id": self.product.id,
            "action": "add"
        }
        self.client.post(BASE_URL, add_payload)
        self.client.post(BASE_URL, add_payload)

        payload = {
            "product_id": self.product.id,
            "action": "remove"
        }
        response = self.client.post(BASE_URL, payload)
        response_data = {"message": "cart updated"}

        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data, response_data)

        get_response_data = "{'products': dict_values([]), 'cart_total_price': 0}"

        get_response = self.client.get(BASE_URL)
        self.assertEqual(str(get_response.data), get_response_data)

    def test_post_clear_cart(self):
        """
        Test cart remove all items from cart API request
        """
        add_payload = {
            "product_id": self.product.id,
            "action": "add"
        }
        self.client.post(BASE_URL, add_payload)
        self.client.post(BASE_URL, add_payload)

        payload = {
            "product_id": self.product.id,
            "action": "clear"
        }
        response = self.client.post(BASE_URL, payload)
        response_data = {"message": "cart updated"}

        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data, response_data)

        get_response_data = "{'products': dict_values([]), 'cart_total_price': 0}"

        get_response = self.client.get(BASE_URL)
        self.assertEqual(str(get_response.data), get_response_data)
