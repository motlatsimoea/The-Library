from django.urls import path
from .views import get_books, get_book, upload_book, books_by_category

urlpatterns = [
    path("books/", get_books, name='books'),
    path("book/<uuid:pk>/", get_book, name='book'),
    path("new_upload/", upload_book, name="new-book"),
    
    path('category/<slug:cat_slug>', books_by_category, name='genres'),
]