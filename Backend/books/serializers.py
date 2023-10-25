from rest_framework import serializers
import json
from .models import Book, Comment, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title']
        

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


class BookSerializer(serializers.ModelSerializer):
    genre = CategorySerializer(many=True, required=False)

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'image', 'script', 'author', 'genre']

    def create(self, validated_data):  
        categories = self.context.get('categories')
        book = Book.objects.create(**validated_data) 
        
        if 'genre' in self.initial_data:
            
            genre_titles = [genre.strip() for genre in self.initial_data['genre'].split(',')]
            print('GENRES:', genre_titles)
            categories = []
            for title in genre_titles:
                category, created = Category.objects.get_or_create(title=title.lower())
                categories.append(category)
        
        book.genre.set(categories) 
        return book
    
    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return serializer.data
    
    




    
