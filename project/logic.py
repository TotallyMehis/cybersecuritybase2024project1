from . import models

def create_message(request):
    message = models.Message.objects.create()
    message.text = request.GET.get('message')
    message.owner = request.user if request.user.is_authenticated else None
    message.save()

def get_messages():
    messages = models.Message.objects.all()
    message_list = []
    for msg in messages:
        name = msg.owner.username if msg.owner else 'Anonymous'
        message_list.append({ 'message': msg.text, 'name': name })
    return message_list

def send_reset_email(email):
    try:
        user = models.User.objects.get(email=email)
        # Here we would send an email...
        return True
    except (models.User.DoesNotExist, models.User.MultipleObjectsReturned):
        return False