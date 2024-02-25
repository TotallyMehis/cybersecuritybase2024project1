from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
