from rest_framework import viewsets

from shop.models import Category, Product


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
