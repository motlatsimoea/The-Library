from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify
from django.contrib.auth.models import User
import uuid

def user_directory_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.upload_by.username, filename)

class Category(models.Model):
    title       = models.CharField(max_length=50, verbose_name='Category')
    slug        = models.SlugField(max_length=50, blank=False, unique=True)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    
    def get_absolute_url(self):
        return reverse('genres', args=[self.slug])
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)
    

class Book(models.Model):
    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    upload_by   = models.ForeignKey(User, on_delete=models.CASCADE)
    title       = models.CharField(max_length=150, blank=False)
    description = models.TextField(blank=False)
    image       = models.ImageField(default='placeholder.jpg', upload_to='book_images')
    script      = models.FileField(upload_to=user_directory_path)
    author      = models.CharField(max_length=150, blank=False)
    genre       = models.ManyToManyField(Category, default=None, blank=False)
    date_upload = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('book-details', kwargs={'pk': self.pk})
    

class Comment(models.Model):
    book        = models.ForeignKey(Book, on_delete=models.CASCADE)
    author      = models.ForeignKey(User, on_delete=models.CASCADE)
    content     = models.TextField()
    timestamp   = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return '{}.{}'.format(self.book.title, str(self.author.username))
        
