from django.db import models
from django.utils import timezone

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=1000)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title