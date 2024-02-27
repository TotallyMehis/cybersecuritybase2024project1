from . import models
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import logging

logger = logging.getLogger(__name__)

def create_message(request):
    content = request.GET.get('message')
    # A04:2021 – Insecure Design
    # CWE-602: Client-Side Enforcement of Server-Side Security
    # Missing logic:
    # if not content or '<' in content or '>' in content:
    #     return False
    message = models.Message.objects.create()
    message.text = content
    message.owner = request.user if request.user.is_authenticated else None
    message.save()
    return True

def get_messages():
    messages = models.Message.objects.all()
    message_list = []
    for msg in messages:
        name = msg.owner.username if msg.owner else 'Anonymous'
        message_list.append({ 'message': msg.text, 'name': name })
    return message_list

def reset_password(request):
    check = request.POST.get('check')
    new_password = request.POST.get('password')
    # A07:2021 – Identification and Authentication Failures
    # CWE-620: Unverified Password Change
    # User should type the original password.
    # if not request.user.check_password(check):
    if check != new_password:
        return 'The passwords did not match!'
    
    try:
        validate_password(new_password, request.user)
    except ValidationError:
        return 'The password is not secure enough!'

    request.user.set_password(new_password)
    request.user.save()

    # A09:2021 – Security Logging and Monitoring Failures
    # CWE-532: Insertion of Sensitive Information into Log File
    # Passwords and other sensitive information should not be logged at all.
    logger.debug(f'User {request.user.username} changed password to {new_password}')

    return 'Your password has been changed.'
