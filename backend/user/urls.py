from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView,
)

from .views import UserCreateView, UserManageView, OrderListView

app_name = "user"

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("token-refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token-verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("logout/", TokenBlacklistView.as_view(), name="logout"),
    path("register/", UserCreateView.as_view(), name="register"),
    path("me/", UserManageView.as_view(), name="me"),
    path("orders/", OrderListView.as_view(), name="orders")
]
