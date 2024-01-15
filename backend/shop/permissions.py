from rest_framework.permissions import BasePermission


class OrderPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff or request.method == "POST":
            return True

