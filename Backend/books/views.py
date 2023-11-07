from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Category, Comment
from .serializers import BookSerializer, CommentSerializer


@api_view(["GET"])
def get_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    
    return Response(serializer.data)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def get_book(request, pk):
    book        = get_object_or_404(Book, id=pk)
    comments    = Comment.objects.filter(book=book).order_by('-id')
    
    book_serializer  = BookSerializer(book, many=False)
    comment_serializer = CommentSerializer(comments, many=True)
    
    if request.method == "POST":
        print('data:', request.data)
        serializer = CommentSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.validated_data['author'] = request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        if not serializer.is_valid():
            # Handle the case where the data is not valid
            print("Data is not valid:", serializer.errors) 
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    combined_data = {
        'book': book_serializer.data,
        'comments': comment_serializer.data
    }
    
    return Response(combined_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_book(request):
    
    if request.method == 'POST':
        
        serializer = BookSerializer(data=request.data)
        # print(request.data)
        
        serializer.validated_data['upload_by'] = request.user
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def books_by_category(request, cat_slug):
    category = get_object_or_404(Category, slug=cat_slug)
    books    = Book.objects.filter(category=category).order_by(-'date_upload')
    
    serializer = BookSerializer(books, many=True)
    
    return Response(serializer.data)
    
    
    
