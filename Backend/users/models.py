from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    bio         = models.TextField(verbose_name='Bio', blank=True)
    image       = models.ImageField(default='default.jpg', upload_to='profile_pics')
    country     = models.CharField(max_length=100, blank=True)
    city        = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f'{self.user} Profile'

    def get_absolute_url(self):
        return reverse('profile_details', args=[self.user])
