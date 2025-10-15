from django.db import models
from django.core.validators import MinLengthValidator
from django.utils.text import slugify

class Service(models.Model):
    name = models.CharField(
        max_length=255,
        unique=True,
        validators=[MinLengthValidator(3)],
        help_text="Service name (must be unique)"
    )
    slug = models.SlugField(
        max_length=255,
        unique=True,
        blank=True,
        help_text="SEO-friendly URL slug"
    )
    description = models.TextField(
        blank=True,
        help_text="Detailed description of the service"
    )
    image = models.ImageField(
        upload_to='services/images/%Y/%m/%d/',
        blank=True,
        null=True,
        help_text="Service image or icon"
    )
    featured = models.BooleanField(
        default=False,
        help_text="Display on homepage"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Is this service currently active?"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower numbers appear first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        indexes = [
            models.Index(fields=['featured', 'is_active']),
            models.Index(fields=['order']),
        ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ServiceFeature(models.Model):
    service = models.ForeignKey(
        Service,
        related_name='features',
        on_delete=models.CASCADE
    )
    feature = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(2)]
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Service Feature'
        verbose_name_plural = 'Service Features'
        unique_together = [['service', 'feature']]

    def __str__(self):
        return f"{self.service.name} - {self.feature}"