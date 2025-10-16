from django.contrib import admin
from django.utils.html import format_html
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'qualification', 'photo_preview', 'created_at')
    search_fields = ('name', 'role')
    list_filter = ('role', 'created_at')
    ordering = ('name',)
    readonly_fields = ('created_at', 'updated_at', 'photo_preview')

    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" width="50" height="50" />', obj.photo.url)
        return ""
    photo_preview.short_description = "Photo"