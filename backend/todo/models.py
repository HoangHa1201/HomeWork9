from distutils.command.upload import upload
from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200, unique=True)
    time = models.CharField(max_length=100)
    reminder = models.BooleanField(default=False)
    image = models.ImageField(upload_to='todo/images/', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
