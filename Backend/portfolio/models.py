from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField

User = get_user_model()


class ProjectCategory(models.Model):
    """Portfolio project category"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text='Icon class name (e.g., fa-web)')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'portfolio_categories'
        verbose_name = 'Project Category'
        verbose_name_plural = 'Project Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Technology(models.Model):
    """Technologies used in projects"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    icon = models.ImageField(upload_to='technologies/', blank=True, null=True)
    color = models.CharField(max_length=7, default='#000000', help_text='Hex color code')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'technologies'
        verbose_name = 'Technology'
        verbose_name_plural = 'Technologies'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Project(models.Model):
    """Portfolio project model"""
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    )
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    client_name = models.CharField(max_length=255, blank=True)
    
    category = models.ForeignKey(ProjectCategory, on_delete=models.SET_NULL, null=True, related_name='projects')
    technologies = models.ManyToManyField(Technology, related_name='projects', blank=True)
    
    short_description = models.TextField(max_length=300, help_text='Brief project description')
    description = RichTextUploadingField(help_text='Full project description')
    case_study = RichTextUploadingField(blank=True, help_text='Detailed case study')
    
    featured_image = models.ImageField(upload_to='portfolio/featured/')
    
    project_url = models.URLField(blank=True, help_text='Live project URL')
    github_url = models.URLField(blank=True, help_text='GitHub repository URL')
    
    # Metrics stored as JSON
    metrics = models.JSONField(
        default=dict,
        blank=True,
        help_text='Project metrics/results as JSON (e.g., {"conversions": "150%", "users": "10k+"})'
    )
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    is_featured = models.BooleanField(default=False)
    
    views_count = models.PositiveIntegerField(default=0)
    order = models.PositiveIntegerField(default=0, help_text='Display order (lower = first)')
    
    completed_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'portfolio_projects'
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        ordering = ['order', '-completed_date']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status']),
            models.Index(fields=['order']),
        ]
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def increment_views(self):
        """Increment project view count"""
        self.views_count += 1
        self.save(update_fields=['views_count'])


class ProjectImage(models.Model):
    """Gallery images for projects"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='portfolio/gallery/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'portfolio_project_images'
        verbose_name = 'Project Image'
        verbose_name_plural = 'Project Images'
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"Image for {self.project.title}"