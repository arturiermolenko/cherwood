from django.test import TestCase

from shop.models import Category, Subcategory, Product


class ShopModelTest(TestCase):
    def setUp(self):
        category = Category.objects.create(
            name="Тестова категорія",
            name_eng="Test category"
        )
        subcategory = Subcategory.objects.create(
            name="Тестова підкатегорія",
            name_eng="Test subcategory",
            category=category
        )
        product = Product.objects.create(
            name="Тестовий продукт",
            name_eng="Test product",
            price=100,
            description="Опис українською",
            description_eng="Test description",
            length=30,
            width=30,
            height=30,
            subcategory=subcategory,
            category=category
        )

    def test_category_str(self):
        category = Category.objects.first()
        self.assertEqual(str(category), category.name)

    def test_subcategory_str(self):
        subcategory = Subcategory.objects.first()
        self.assertEqual(
            str(subcategory),
            f"{subcategory.name}({subcategory.category})"
        )

    def test_product_str(self):
        product = Product.objects.first()
        self.assertEqual(str(product), product.name)
