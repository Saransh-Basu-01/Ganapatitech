from django.db import models
from django.core.validators import EmailValidator
from django.conf import settings


class ContactConfiguration(models.Model):
    """Store admin email addresses for contact form notifications"""
    recipient_email = models.EmailField(
        validators=[EmailValidator()],
        help_text="Email address to receive contact form submissions"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Contact Email Recipient"
        verbose_name_plural = "Contact Email Recipients"
    
    def __str__(self):
        return f"{self.recipient_email} ({'Active' if self.is_active else 'Inactive'})"


class ContactMessage(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField(validators=[EmailValidator()])
    subject = models.CharField(max_length=255)
    message = models.TextField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    
    # Enhanced status tracking
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new',
        db_index=True
    )
    read = models.BooleanField(default=False)  # Kept for backwards compatibility
    
    # Email notification tracking
    email_sent = models.BooleanField(
        default=False,
        help_text="Whether notification email was sent to admin"
    )
    email_sent_at = models.DateTimeField(null=True, blank=True)
    email_error = models.TextField(
        blank=True,
        help_text="Error message if email sending failed"
    )
    
    # Admin response
    admin_reply = models.TextField(
        blank=True,
        help_text="Admin's response to this message"
    )
    replied_at = models.DateTimeField(null=True, blank=True)
    replied_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='contact_replies'
    )
    
    # IP tracking for security
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'
        indexes = [
            models.Index(fields=['-created_at', 'status']),
            models.Index(fields=['email', 'created_at']),
        ]

    def __str__(self):
        return f"{self.name} - {self.subject} ({self.get_status_display()})"
    
    def mark_as_read(self):
        """Mark message as read"""
        if not self.read:
            self.read = True
            self.status = 'read'
            self.save(update_fields=['read', 'status', 'updated_at'])
    
    def mark_as_replied(self, user=None):
        """Mark message as replied"""
        from django.utils import timezone
        self.status = 'replied'
        self.replied_at = timezone.now()
        if user:
            self.replied_by = user
        self.save(update_fields=['status', 'replied_at', 'replied_by', 'updated_at'])
