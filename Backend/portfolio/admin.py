from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Project, ProjectCategory, Technology, ProjectImage


@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color', 'created_at']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ['color']


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ['image', 'caption', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'client_name', 'category', 'status', 'is_featured', 'order', 'views_count', 'completed_date']
    list_filter = ['status', 'is_featured', 'category', 'completed_date']
    search_fields = ['title', 'client_name', 'description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['technologies']
    date_hierarchy = 'completed_date'
    inlines = [ProjectImageInline]
    list_editable = ['order', 'is_featured']
    
    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'slug', 'client_name', 'category', 'technologies')
        }),
        ('Content', {
            'fields': ('short_description', 'description', 'case_study', 'featured_image')
        }),
        ('Links', {
            'fields': ('project_url', 'github_url')
        }),
        ('Metrics & Results', {
            'fields': ('metrics',),
            'classes': ('collapse',)
        }),
        ('Settings', {
            'fields': ('status', 'is_featured', 'order', 'completed_date')
        }),
        ('Statistics', {
            'fields': ('views_count',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['views_count']


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ['project', 'caption', 'order', 'created_at']
    list_filter = ['project', 'created_at']
    search_fields = ['project__title', 'caption']
    list_editable = ['order']