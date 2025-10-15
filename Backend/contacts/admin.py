from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils import timezone
from .models import ContactMessage, ContactConfiguration
from .services import ContactEmailService


@admin.register(ContactConfiguration)
class ContactConfigurationAdmin(admin.ModelAdmin):
    list_display = ['recipient_email', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['recipient_email']
    ordering = ['-created_at']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'email', 'subject', 'status_badge',
        'read_badge', 'email_sent_badge', 'created_at'
    ]
    list_filter = ['status', 'read', 'email_sent', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message', 'phone']
    ordering = ['-created_at']
    readonly_fields = [
        'created_at', 'updated_at', 'email_sent', 'email_sent_at',
        'email_error', 'ip_address', 'user_agent', 'replied_at', 'replied_by'
    ]
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message Details', {
            'fields': ('subject', 'message')
        }),
        ('Status', {
            'fields': ('status', 'read')
        }),
        ('Admin Reply', {
            'fields': ('admin_reply',),
            'classes': ('collapse',)
        }),
        ('Email Tracking', {
            'fields': ('email_sent', 'email_sent_at', 'email_error'),
            'classes': ('collapse',)
        }),
        ('Reply Tracking', {
            'fields': ('replied_at', 'replied_by'),
            'classes': ('collapse',)
        }),
        ('Technical Info', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    actions = [
        'mark_as_read',
        'mark_as_unread',
        'mark_as_replied',
        'mark_as_archived',
        'resend_notification'
    ]

    def status_badge(self, obj):
        """Display status as colored badge"""
        colors = {
            'new': '#ff9800',
            'read': '#2196F3',
            'replied': '#4CAF50',
            'archived': '#9E9E9E',
        }
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px;">{}</span>',
            colors.get(obj.status, '#999'),
            obj.get_status_display()
        )
    status_badge.short_description = 'Status'

    def read_badge(self, obj):
        """Display read status as badge"""
        if obj.read:
            return format_html(
                '<span style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px;">✓ Read</span>'
            )
        return format_html(
            '<span style="background-color: #f44336; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px;">✗ Unread</span>'
        )
    read_badge.short_description = 'Read Status'

    def email_sent_badge(self, obj):
        """Display email sent status"""
        if obj.email_sent:
            return format_html(
                '<span style="color: #4CAF50;">✓ Sent</span>'
            )
        elif obj.email_error:
            return format_html(
                '<span style="color: #f44336;" title="{}">✗ Failed</span>',
                obj.email_error
            )
        return format_html('<span style="color: #ff9800;">⊘ Pending</span>')
    email_sent_badge.short_description = 'Email'

    def mark_as_read(self, request, queryset):
        """Mark selected messages as read"""
        updated = 0
        for message in queryset:
            if not message.read:
                message.mark_as_read()
                updated += 1
        self.message_user(request, f'{updated} message(s) marked as read.')
    mark_as_read.short_description = "Mark selected as read"

    def mark_as_unread(self, request, queryset):
        """Mark selected messages as unread"""
        updated = queryset.update(read=False, status='new')
        self.message_user(request, f'{updated} message(s) marked as unread.')
    mark_as_unread.short_description = "Mark selected as unread"

    def mark_as_replied(self, request, queryset):
        """Mark selected messages as replied"""
        updated = 0
        for message in queryset:
            message.mark_as_replied(user=request.user)
            updated += 1
        self.message_user(request, f'{updated} message(s) marked as replied.')
    mark_as_replied.short_description = "Mark selected as replied"

    def mark_as_archived(self, request, queryset):
        """Archive selected messages"""
        updated = queryset.update(status='archived')
        self.message_user(request, f'{updated} message(s) archived.')
    mark_as_archived.short_description = "Archive selected messages"

    def resend_notification(self, request, queryset):
        """Resend notification emails for selected messages"""
        success_count = 0
        for message in queryset:
            if ContactEmailService.send_admin_notification(message):
                success_count += 1
        self.message_user(request, f'Notification email(s) sent for {success_count} message(s).')
    resend_notification.short_description = "Resend notification email"
