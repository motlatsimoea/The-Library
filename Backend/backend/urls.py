
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    path("admin/", admin.site.urls),
    path("api/", include("books.urls")),
    path("api/users/", include("users.urls")),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
