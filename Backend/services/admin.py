from django.contrib import admin
from .models import Service

# @admin.register(ServiceCategory)
# class ServiceCategoryAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'created_at')
#     search_fields = ('name',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name','gradient', 'featured', 'created_at')
    list_filter = ('featured',)
    search_fields = ('name', 'description')
