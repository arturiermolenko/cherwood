from django.urls import path

from order.views import OrderCreateView

urlpatterns = [
    path("create/", OrderCreateView.as_view(), name="create-order"),
]


app_name = "order"
