from django.contrib import admin
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'qualification', 'created_at')
    search_fields = ('name', 'role')
    list_filter = ('role', 'created_at')
    ordering = ('name',)
