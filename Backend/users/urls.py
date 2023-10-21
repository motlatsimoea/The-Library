from django.urls import path
from .views import update_user_profile, get_user_profile, user_register


urlpatterns = [
    path("register/", user_register, name="register"),
    
    path("profile/update", update_user_profile, name='profile-update'),
    path("profile/<str:username>/", get_user_profile, name="user-profile"),
    
]