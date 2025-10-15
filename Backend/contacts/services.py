from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils import timezone
from .models import ContactConfiguration, ContactMessage
import logging

logger = logging.getLogger(__name__)


class ContactEmailService:
    """Service for sending contact form related emails"""
    
    @staticmethod
    def get_recipient_emails():
        """Get all active recipient email addresses"""
        recipients = ContactConfiguration.objects.filter(is_active=True).values_list(
            'recipient_email', flat=True
        )
        if recipients:
            return list(recipients)
        # Fallback to settings
        return [settings.DEFAULT_FROM_EMAIL]
    
    @staticmethod
    def send_admin_notification(contact_message):
        """
        Send email notification to admin when new contact message is received
        """
        try:
            recipient_emails = ContactEmailService.get_recipient_emails()
            
            subject = f"New Contact Form Submission: {contact_message.subject}"
            
            # Plain text content
            text_content = f"""
New Contact Form Submission

Name: {contact_message.name}
Email: {contact_message.email}
Phone: {contact_message.phone or 'Not provided'}
Subject: {contact_message.subject}

Message:
{contact_message.message}

Submitted at: {contact_message.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}
IP Address: {contact_message.ip_address or 'Unknown'}

View in admin: {settings.SITE_URL}/admin/contacts/contactmessage/{contact_message.id}/change/
"""
            
            # HTML content (optional, better formatting)
            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #4CAF50; color: white; padding: 10px; text-align: center; }}
        .content {{ background-color: #f9f9f9; padding: 20px; margin-top: 10px; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #555; }}
        .value {{ margin-top: 5px; }}
        .message-box {{ background-color: white; padding: 15px; border-left: 4px solid #4CAF50; }}
        .footer {{ margin-top: 20px; padding: 10px; background-color: #f1f1f1; text-align: center; font-size: 12px; }}
        .button {{ background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 10px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📧 New Contact Form Submission</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{contact_message.name}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:{contact_message.email}">{contact_message.email}</a></div>
            </div>
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">{contact_message.phone or 'Not provided'}</div>
            </div>
            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">{contact_message.subject}</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">{contact_message.message}</div>
            </div>
            <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">{contact_message.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}</div>
            </div>
            <div class="field">
                <div class="label">IP Address:</div>
                <div class="value">{contact_message.ip_address or 'Unknown'}</div>
            </div>
            <a href="{settings.SITE_URL}/admin/contacts/contactmessage/{contact_message.id}/change/" class="button">
                View in Admin Panel
            </a>
        </div>
        <div class="footer">
            This is an automated notification from your website contact form.
        </div>
    </div>
</body>
</html>
"""
            
            # Create email with both plain text and HTML
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=recipient_emails,
            )
            email.attach_alternative(html_content, "text/html")
            email.send()
            
            # Update contact message
            contact_message.email_sent = True
            contact_message.email_sent_at = timezone.now()
            contact_message.email_error = ''
            contact_message.save(update_fields=['email_sent', 'email_sent_at', 'email_error'])
            
            logger.info(f"Contact notification email sent for message #{contact_message.id}")
            return True
            
        except Exception as e:
            error_message = str(e)
            logger.error(f"Failed to send contact notification email: {error_message}")
            
            # Update contact message with error
            contact_message.email_sent = False
            contact_message.email_error = error_message
            contact_message.save(update_fields=['email_sent', 'email_error'])
            
            return False
    
    @staticmethod
    def send_confirmation_to_user(contact_message):
        """
        Send confirmation email to user who submitted the contact form
        """
        try:
            subject = f"We received your message: {contact_message.subject}"
            
            text_content = f"""
Dear {contact_message.name},

Thank you for contacting us! We have received your message and will get back to you as soon as possible.

Your Message Details:
Subject: {contact_message.subject}
Submitted: {contact_message.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}

We typically respond within 24-48 hours during business days.

Best regards,
The Team
"""
            
            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #2196F3; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background-color: #f9f9f9; margin-top: 10px; }}
        .footer {{ margin-top: 20px; padding: 10px; background-color: #f1f1f1; text-align: center; font-size: 12px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>✅ Message Received</h2>
        </div>
        <div class="content">
            <p>Dear {contact_message.name},</p>
            <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
            <h3>Your Message Details:</h3>
            <p><strong>Subject:</strong> {contact_message.subject}</p>
            <p><strong>Submitted:</strong> {contact_message.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
            <p>We typically respond within 24-48 hours during business days.</p>
            <p>Best regards,<br>The Team</p>
        </div>
        <div class="footer">
            This is an automated confirmation. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
"""
            
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[contact_message.email],
            )
            email.attach_alternative(html_content, "text/html")
            email.send()
            
            logger.info(f"Confirmation email sent to user for message #{contact_message.id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send user confirmation email: {str(e)}")
            return False
    
    @staticmethod
    def send_reply_to_user(contact_message):
        """
        Send admin's reply to the user
        """
        try:
            if not contact_message.admin_reply:
                raise ValueError("No admin reply to send")
            
            subject = f"Re: {contact_message.subject}"
            
            text_content = f"""
Dear {contact_message.name},

Thank you for your patience. Here is our response to your inquiry:

{contact_message.admin_reply}

If you have any further questions, please don't hesitate to contact us again.

Best regards,
The Team

---
Original Message:
{contact_message.message}
"""
            
            html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background-color: #4CAF50; color: white; padding: 20px; text-align: center; }}
        .content {{ padding: 20px; background-color: #f9f9f9; margin-top: 10px; }}
        .reply-box {{ background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin: 15px 0; }}
        .original-box {{ background-color: #f1f1f1; padding: 15px; margin-top: 20px; border-left: 4px solid #999; }}
        .footer {{ margin-top: 20px; padding: 10px; background-color: #f1f1f1; text-align: center; font-size: 12px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📬 Response to Your Inquiry</h2>
        </div>
        <div class="content">
            <p>Dear {contact_message.name},</p>
            <p>Thank you for your patience. Here is our response to your inquiry:</p>
            <div class="reply-box">
                {contact_message.admin_reply.replace(chr(10), '<br>')}
            </div>
            <p>If you have any further questions, please don't hesitate to contact us again.</p>
            <p>Best regards,<br>The Team</p>
            <div class="original-box">
                <h4>Original Message:</h4>
                <p><strong>Subject:</strong> {contact_message.subject}</p>
                <p>{contact_message.message.replace(chr(10), '<br>')}</p>
            </div>
        </div>
        <div class="footer">
            This email was sent in response to your contact form submission.
        </div>
    </div>
</body>
</html>
"""
            
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[contact_message.email],
            )
            email.attach_alternative(html_content, "text/html")
            email.send()
            
            logger.info(f"Reply email sent to user for message #{contact_message.id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send reply email: {str(e)}")
            return False