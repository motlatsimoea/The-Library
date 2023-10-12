from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from rest_framework_simplejwt.tokens import RefreshToken

class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ['bio', 'image', 'country', 'city']
    

class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'profile']
        
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile      = instance.profile
        
        instance.username = validated_data.get('username', instance.username)
        instance.email    = validated_data.get('email', instance.email)   
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        
        profile.bio = profile_data.get( 'bio', profile.bio)
        profile.image = profile_data.get( 'image', profile.image)
        profile.country = profile_data.get( 'country', profile.country)
        profile.city = profile_data.get( 'city', profile.city)
        profile.save()
        
        return instance
        

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)   
    
    def get_isAdmin(self, obj):
        return obj.is_staff 
    

    

 
class UserUpdateSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    profile = ProfileSerializer()
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'token', 'profile']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token) 
        
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile      = instance.profile
        
        instance.username = validated_data.get('username', instance.username)
        instance.email    = validated_data.get('email', instance.email)   
        instance.password = validated_data.get('password', instance.password)
        instance.save()
        
        profile.bio = profile_data.get( 'bio', profile.bio)
        profile.image = profile_data.get( 'image', profile.image)
        profile.country = profile_data.get( 'country', profile.country)
        profile.city = profile_data.get( 'city', profile.city)
        profile.save()
        
        return instance