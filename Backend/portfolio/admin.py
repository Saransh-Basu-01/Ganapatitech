from django.contrib import admin
from django.utils.html import format_html
from .models import Portfolio, PortfolioCategory, Technology, PortfolioImage


class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 1
    fields = ['image', 'caption', 'order']
    ordering = ['order']


@admin.register(PortfolioCategory)
class PortfolioCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'order', 'is_active', 'projects_count', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
    readonly_fields = ['created_at', 'updated_at']  # Removed 'slug' from here

    def projects_count(self, obj):
        return obj.portfolios.count()
    projects_count.short_description = 'Projects'


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'icon', 'color_preview', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['name']

    def color_preview(self, obj):
        if obj.color:
            return format_html(
                '<div style="width: 20px; height: 20px; background-color: {}; border: 1px solid #ccc;"></div>',
                obj.color
            )
        return '-'
    color_preview.short_description = 'Color'


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = [
        'title', 'category', 'client', 'completion_date',
        'image_preview', 'featured', 'is_published',
        'view_count', 'created_at'
    ]
    list_filter = ['featured', 'is_published', 'category', 'technologies', 'completion_date']
    search_fields = ['title', 'description', 'client', 'technologies__name']
    list_editable = ['featured', 'is_published']
    prepopulated_fields = {'slug': ('title',)}  # This auto-generates slug from title
    filter_horizontal = ['technologies']
    readonly_fields = ['view_count', 'image_preview', 'thumbnail_preview', 'created_at', 'updated_at']  # Removed 'slug'
    inlines = [PortfolioImageInline]
    ordering = ['-featured', 'order', '-completion_date']

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'short_description')
        }),
        ('Project Details', {
            'fields': ('category', 'technologies', 'client')
        }),
        ('Dates', {
            'fields': ('start_date', 'completion_date')
        }),
        ('Links', {
            'fields': ('project_url', 'github_url', 'demo_link')
        }),
        ('Media', {
            'fields': ('image', 'image_preview', 'thumbnail', 'thumbnail_preview')
        }),
        ('Display Settings', {
            'fields': ('featured', 'is_published', 'order')
        }),
        ('Statistics', {
            'fields': ('view_count',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="150" height="150" style="object-fit: cover;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = 'Image Preview'

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" width="100" height="100" style="object-fit: cover;" />',
                obj.thumbnail.url
            )
        return "No thumbnail"
    thumbnail_preview.short_description = 'Thumbnail Preview'

    # Custom actions for bulk operations
    actions = ['make_featured', 'remove_featured', 'publish', 'unpublish']

    def make_featured(self, request, queryset):
        updated = queryset.update(featured=True)
        self.message_user(request, f'{updated} project(s) marked as featured.')
    make_featured.short_description = "Mark as featured"

    def remove_featured(self, request, queryset):
        updated = queryset.update(featured=False)
        self.message_user(request, f'{updated} project(s) removed from featured.')
    remove_featured.short_description = "Remove from featured"

    def publish(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f'{updated} project(s) published.')
    publish.short_description = "Publish selected projects"

    def unpublish(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f'{updated} project(s) unpublished.')
    unpublish.short_description = "Unpublish selected projects"


@admin.register(PortfolioImage)
class PortfolioImageAdmin(admin.ModelAdmin):
    list_display = ['portfolio', 'image_preview', 'caption', 'order', 'created_at']
    list_filter = ['portfolio', 'created_at']
    search_fields = ['portfolio__title', 'caption']
    ordering = ['portfolio', 'order']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="100" style="object-fit: cover;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = 'Preview'