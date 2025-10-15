from django.contrib import admin
from django.utils.html import format_html
from .models import Service, ServiceFeature


class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1
    fields = ['feature', 'order']
    ordering = ['order']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'image_preview', 'featured', 'is_active',
        'order', 'features_count', 'created_at'
    ]
    list_filter = ['featured', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'features__feature']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
    readonly_fields = ['image_preview', 'created_at', 'updated_at']
    inlines = [ServiceFeatureInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'description', 'image', 'image_preview')
        }),
        ('Display Settings', {
            'fields': ('featured', 'is_active', 'order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="100" style="object-fit: cover;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = 'Image Preview'

    def features_count(self, obj):
        return obj.features.count()
    features_count.short_description = 'Features'

    actions = ['make_featured', 'make_not_featured', 'activate', 'deactivate']

    def make_featured(self, request, queryset):
        queryset.update(featured=True)
    make_featured.short_description = "Mark as featured"

    def make_not_featured(self, request, queryset):
        queryset.update(featured=False)
    make_not_featured.short_description = "Remove from featured"

    def activate(self, request, queryset):
        queryset.update(is_active=True)
    activate.short_description = "Activate services"

    def deactivate(self, request, queryset):
        queryset.update(is_active=False)
    deactivate.short_description = "Deactivate services"


@admin.register(ServiceFeature)
class ServiceFeatureAdmin(admin.ModelAdmin):
    list_display = ['feature', 'service', 'order', 'created_at']
    list_filter = ['service', 'created_at']
    search_fields = ['feature', 'service__name']
    ordering = ['service', 'order']