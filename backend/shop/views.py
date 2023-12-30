from rest_framework import mixins
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet

from shop.models import Category, Product, ProductImage
from shop.serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductImageSerializer,
)


class CategoryViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = Category.objects.prefetch_related("subcategories").all()
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)


class ProductViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = (
        Product.objects.select_related()
        .prefetch_related(
            "images",
            "buying_with_it__buying_with_it__product_set",
            "category__subcategories__products",
        )
        .order_by("id")
    )
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)


class ProductImageViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = (AllowAny,)
