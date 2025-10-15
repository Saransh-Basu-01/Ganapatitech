from django.db import models
from django.utils.text import slugify
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError


class PortfolioCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    description = models.TextField(blank=True, help_text="Category description")
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon class (e.g., fa-code, fa-mobile)"
    )
    order = models.PositiveIntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Portfolio Category'
        verbose_name_plural = 'Portfolio Categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Technology(models.Model):
    """Separate model for technologies for better filtering"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True, blank=True, max_length=100)
    icon = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=7, blank=True, help_text="Hex color code")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'Technology'
        verbose_name_plural = 'Technologies'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Portfolio(models.Model):
    # Basic Information
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, max_length=255)
    description = models.TextField()
    short_description = models.CharField(
        max_length=200,
        blank=True,
        help_text="Brief description for cards/lists"
    )
    
    # Project Details
    technologies = models.ManyToManyField(
        Technology,
        related_name='portfolios',
        blank=True
    )
    client = models.CharField(max_length=255, blank=True)
    project_url = models.URLField(
        blank=True,
        validators=[URLValidator()],
        help_text="Live project URL"
    )
    github_url = models.URLField(
        blank=True,
        validators=[URLValidator()],
        help_text="GitHub repository URL"
    )
    demo_link = models.URLField(
        blank=True,
        validators=[URLValidator()],
        help_text="Demo video or presentation link"
    )
    
    # Dates
    start_date = models.DateField(null=True, blank=True)
    completion_date = models.DateField(null=True, blank=True)
    
    # Media
    image = models.ImageField(
        upload_to='portfolio/images/%Y/%m/%d/',
        blank=True,
        null=True,
        help_text="Main project image"
    )
    thumbnail = models.ImageField(
        upload_to='portfolio/thumbnails/%Y/%m/%d/',
        blank=True,
        null=True,
        help_text="Thumbnail for cards/lists"
    )
    
    # Categorization
    category = models.ForeignKey(
        PortfolioCategory,
        on_delete=models.PROTECT,
        related_name='portfolios'
    )
    
    # Status & Display
    featured = models.BooleanField(
        default=False,
        help_text="Display on homepage"
    )
    is_published = models.BooleanField(
        default=True,
        help_text="Visible to public"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display order (lower appears first)"
    )
    
    # Metrics (optional)
    view_count = models.PositiveIntegerField(default=0, editable=False)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-featured', 'order', '-completion_date', '-created_at']
        verbose_name = 'Portfolio Project'
        verbose_name_plural = 'Portfolio Projects'
        indexes = [
            models.Index(fields=['featured', 'is_published']),
            models.Index(fields=['category', 'is_published']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.short_description and self.description:
            self.short_description = self.description[:197] + '...' if len(self.description) > 200 else self.description
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    def increment_view_count(self):
        """Increment view count"""
        self.view_count += 1
        self.save(update_fields=['view_count'])


class PortfolioImage(models.Model):
    """Additional images for portfolio gallery"""
    portfolio = models.ForeignKey(
        Portfolio,
        on_delete=models.CASCADE,
        related_name='gallery_images'
    )
    image = models.ImageField(upload_to='portfolio/gallery/%Y/%m/%d/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Portfolio Image'
        verbose_name_plural = 'Portfolio Images'

    def __str__(self):
        return f"{self.portfolio.title} - Image {self.id}"