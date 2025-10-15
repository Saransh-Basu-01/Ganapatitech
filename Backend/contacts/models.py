from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    read = models.BooleanField(default=False)  # optional
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"
