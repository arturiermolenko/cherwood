from django.http import JsonResponse
from rest_framework import mixins
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

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


class AddRemoveFavouriteView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def post(self, request, pk):
        user = self.request.user
        product = get_object_or_404(Product, id=pk)

        if user.favourites.filter(id=pk).exists():
            user.favourites.remove(product)
            return JsonResponse({"message": "Product removed from favorites successfully"})
        user.favourites.add(product)
        return JsonResponse({"message": "Product added to favorites successfully"})
