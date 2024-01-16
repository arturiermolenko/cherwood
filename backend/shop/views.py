from django.http import JsonResponse
from rest_framework import mixins, status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.authentication import JWTAuthentication

from shop.models import Category, Product, ProductImage
from shop.serializers import (
    CategorySerializer,
    ProductSerializer,
    ProductImageSerializer
)
from shop.services import Cart


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
            return JsonResponse(
                {"message": "Product removed from favorites successfully"}
            )
        user.favourites.add(product)
        return JsonResponse({"message": "Product added to favorites successfully"})


class CartAPI(APIView):
    """
    Single API to handle cart operations
    """

    def get(self, request):
        cart = Cart(request)

        return Response(
            {"products": cart.get_all(), "cart_total_price": cart.get_total_price()},
            status=status.HTTP_200_OK,
        )

    def post(self, request, **kwargs):
        cart = Cart(request)
        product_id = request.data.get("product_id")
        action = request.data.get("action")

        if action == "add":
            cart.add(str(product_id))
        elif action == "remove_one":
            cart.remove_one(str(product_id))
        elif action == "remove":
            cart.remove_item(str(product_id))
        elif action == "clear":
            cart.clear()
        else:
            return Response({"message": "choose action"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"message": "cart updated"}, status=status.HTTP_202_ACCEPTED)

