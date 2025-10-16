from django.contrib import admin
from .models import Blog, BlogCategory, Tag


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'blog_count')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)
    readonly_fields = ('id',)
    
    def blog_count(self, obj):
        return obj.blogs.count()
    blog_count.short_description = 'Number of Blogs'


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'blog_count')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)
    readonly_fields = ('id',)
    
    def blog_count(self, obj):
        return obj.blogs.count()
    blog_count.short_description = 'Number of Blogs'


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'author', 'featured', 'created_at', 'updated_at')
    list_filter = ('category', 'tags', 'featured', 'created_at', 'author')
    search_fields = ('title', 'content', 'author__username')
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ('tags',)
    readonly_fields = ('id', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'
    
    def save_model(self, request, obj, form, change):
        if not change:  # If creating new object
            if not obj.author:
                obj.author = request.user
        super().save_model(request, obj, form, change)