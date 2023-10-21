from django.shortcuts import render
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Profile
from books.models import Book
from django.contrib.auth.models import User

from .serializers import UserSerializerWithToken, UserUpdateSerializerWithToken, UserProfileSerializer
from books.serializers import BookSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
        
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v

        return data

@api_view(['POST']) 
def user_register(request):
    data = request.data
    
    try:
        user = User.objects.create(
            username = data['username'],
            email = data['email'],
            password = make_password(data['password'])
        )
        
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'user with this email already exists!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_user_profile(request, username):
    if request.method == 'GET':
        try:
            user = User.objects.get(username=username)
            user_books   = Book.objects.filter(upload_by=user)
            
            #Serialize the Data
            # user_profile_serializer = UserProfileSerializer(user, many=False)
            user_profile_serializer = UserProfileSerializer(user)
            user_book_serializer = BookSerializer(user_books, many=True)
            
            combined_data = {
                'user_profile': user_profile_serializer.data,
                'user_books': user_book_serializer.data,
            }
            return Response(combined_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])   
def update_user_profile(request):
    if request.method == 'PUT':
        user = request.user
        serializer = UserUpdateSerializerWithToken(user, data=request.data, many=False)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

