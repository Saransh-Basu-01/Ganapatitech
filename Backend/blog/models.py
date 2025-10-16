from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class TimeStampedModel(models.Model):
    """Abstract base model with timestamps"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class BlogCategory(TimeStampedModel):
    name = models.CharField(
        max_length=100, 
        unique=True,
        validators=[MinLengthValidator(2)],
        help_text=_("Category name (2-100 characters)")
    )
    slug = models.SlugField(unique=True, blank=True, max_length=120)
    description = models.TextField(blank=True, help_text=_("Category description"))

    class Meta:
        verbose_name = _("Blog Category")
        verbose_name_plural = _("Blog Categories")
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(TimeStampedModel):
    name = models.CharField(
        max_length=50, 
        unique=True,
        validators=[MinLengthValidator(2)],
        help_text=_("Tag name (2-50 characters)")
    )
    slug = models.SlugField(unique=True, blank=True, max_length=60)

    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Blog(TimeStampedModel):
    title = models.CharField(
        max_length=200,
        validators=[MinLengthValidator(5)],
        help_text=_("Blog title (5-200 characters)")
    )
    slug = models.SlugField(unique=True, blank=True, max_length=220)
    category = models.ForeignKey(
        BlogCategory, 
        on_delete=models.SET_NULL, 
        null=True,
        blank=True,
        related_name='blogs'
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name='blogs')
    content = models.TextField(
        validators=[MinLengthValidator(10)],
        help_text=_("Blog content (minimum 10 characters)")
    )
    image = models.ImageField(
        upload_to='blog_images/%Y/%m/%d/', 
        null=True, 
        blank=True,
        help_text=_("Featured image for the blog post")
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='blogs',
        help_text=_("Author of the blog post")
    )
    featured = models.BooleanField(
        default=False,
        help_text=_("Mark as featured to display prominently")
    )
    is_published = models.BooleanField(
        default=True,
        help_text=_("Published posts are visible to the public")
    )

    class Meta:
        verbose_name = _("Blog Post")
        verbose_name_plural = _("Blog Posts")
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['slug']),
            models.Index(fields=['featured', '-created_at']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title