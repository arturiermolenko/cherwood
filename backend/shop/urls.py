from django.urls import path, include
from rest_framework import routers

from shop.views import CategoryViewSet, ProductViewSet, ProductImageViewSet

app_name = "shop"

router = routers.DefaultRouter()

router.register("categories", CategoryViewSet, basename="category")
router.register("products", ProductViewSet, basename="product")
router.register("product_images", ProductImageViewSet, basename="product_image")

urlpatterns = [path("", include(router.urls))]
