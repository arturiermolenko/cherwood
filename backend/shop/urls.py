from django.urls import path, include
from rest_framework import routers

from shop.views import CategoryViewSet, ProductViewSet, AddRemoveFavouriteView, CartAPI

app_name = "shop"

router = routers.DefaultRouter()

router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "products/<int:pk>/favourite/",
        AddRemoveFavouriteView.as_view(),
        name="favourites",
    ),
    path("cart/", CartAPI.as_view(), name="cart"),
]
