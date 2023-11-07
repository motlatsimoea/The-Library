from rest_framework import serializers
import json
from .models import Book, Comment, Category
from users.serializers import ProfileSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title']
        

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='author.username')
    profile  = ProfileSerializer(source='author.profile', read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'book', 'username', 'profile', 'content', 'timestamp']
      
        
    def create(self, validated_data):
        
        #print("Received validated data:", validated_data)

        user = self.context['request'].user
        #print("User:", user)

        book_id = self.context['request'].data.get('book')
        #print("Book ID:", book_id)
        
        user = self.context['request'].user
        book_id = self.context['request'].data.get('book')
        
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            raise serializers.ValidationError("invalid Book ID")
        
        comment_data = {**validated_data, 'author': user, 'book': book}
        comment = Comment.objects.create(**comment_data)
        return comment


class BookSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='upload_by.username')
    genre = CategorySerializer(many=True, required=False)

    class Meta:
        model = Book
        fields = ['id', 'username', 'title', 'description', 'image', 'script', 'author', 'genre']

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
    
    




    
