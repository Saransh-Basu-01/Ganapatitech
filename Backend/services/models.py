from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    featured = models.BooleanField(default=False)
    gradient = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
