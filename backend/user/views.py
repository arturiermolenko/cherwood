from django.contrib.auth import get_user_model
from rest_framework import generics

from .serializers import UserCreateSerializer


class UserCreateView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = get_user_model().objects.all()
    permission_classes = []
    authentication_classes = []
