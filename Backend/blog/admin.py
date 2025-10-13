from django.contrib import admin
from .models import Blog, BlogCategory, Tag

# ---------------------------
# BlogCategory Admin
# ---------------------------
@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)


# ---------------------------
# Tag Admin
# ---------------------------
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)


# ---------------------------
# Blog Admin
# ---------------------------
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'author', 'featured', 'created_at')
    list_filter = ('category', 'tags', 'featured', 'created_at')
    search_fields = ('title', 'content')
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ('tags',)  # allows selecting multiple tags easily
