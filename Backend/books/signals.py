from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Book, Comment
from notifications.models import Notification

@receiver(post_save, sender=Comment)
def user_comment(sender, instance, created, **kwargs):
    if created:
        comment = instance
        book    = comment.book
        sender  = comment.author
        if sender != book.author:
            notify = Notification(book=book, sender=sender, user=book.author, notification_type=2)
            notify.save()
            
        for comment in book.comment_set.all():
            if comment.user != sender:
                notify_participants = Notification(book=book, sender=sender, user=comment.user, notification_type=2)
                notify_participants.save()