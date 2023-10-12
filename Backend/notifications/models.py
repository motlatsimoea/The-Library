from django.db import models
from django.contrib.auth.models import User

class Notification(models.Model):
    NOTIFICATION_TYPES = ((1, 'Like'), (2, 'Comment'))
    
    book                = models.ForeignKey('books.Book', on_delete=models.CASCADE, related_name='book_notice', blank=True, null=True)
    sender              = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notice_from_user')
    receiver            = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notice_to_user')
    Notification_type   = models.IntegerField(choices=NOTIFICATION_TYPES)
    text_prev           = models.CharField(max_length=50, blank=True)
    date                = models.DateTimeField(auto_now_add=True)
    is_seen             = models.BooleanField(default=False)
    