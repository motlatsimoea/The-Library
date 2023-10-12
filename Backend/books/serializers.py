from rest_framework import serializers
import json
from .models import Book, Comment, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title']

""" class BookSerializer(serializers.ModelSerializer):
    genre = CategorySerializer(many=True, required=False)

    class Meta:
        model = Book
        fields = ['title', 'description', 'image', 'script', 'author', 'genre']

    def to_internal_value(self, data):
        if 'genre' in data:
            genre_titles = [genre.strip() for genre in data['genre'].split(',')]
            categories = []
            for title in genre_titles:
                category, created = Category.objects.get_or_create(title=title.lower())
                categories.append(category)
            data['genre'] = categories
            print('data', data['genre'])
        return super().to_internal_value(data)

    def create(self, validated_data):
        #genre_data = validated_data['genre']
        #print('and', genre_data)
        # Create the Book instance without setting the genre field
        book = Book.objects.create(**validated_data)
        #book.genre.set(genre_data)
        book.save()
        return book

         """
class BookSerializer(serializers.ModelSerializer):
    genre = CategorySerializer(many=True, required=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'image', 'script', 'author', 'genre']

    def create(self, validated_data):  
        
        book = Book.objects.create(**validated_data) 
        
        if 'genre' in self.initial_data:
            genre_titles = [genre.strip() for genre in self.initial_data['genre'].split(',')]
            categories = []
            for title in genre_titles:
                category, created = Category.objects.get_or_create(title=title.lower())
                categories.append(category)
        
        book.genre.set(categories) 
        return book
    
    
class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'
        
    def create(self, validated_data):

        user = self.context['request'].user
        book = self.context['request'].book
        
        validated_data.author = user
        validated_data.book   = book
        
        return Book.objects.create(**validated_data)
        



    
