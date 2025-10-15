from django.db import models
from services.models import Service  # Assuming your Service model is in services app

class Review(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reviews')
    username = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    rating = models.PositiveSmallIntegerField()  # 1 to 5
    review = models.TextField()
    approved = models.BooleanField(default=False)  # Admin must approve
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.username} - {self.service.name} ({self.rating}⭐)"
