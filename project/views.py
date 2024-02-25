from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import logout
from . import logic



def index(request):
    return render(request, 'project/index.html', { 'messages': logic.get_messages() })

def login(request):
    return render(request, 'project/login.html')

def logout_view(request):
    logout(request)
    return redirect('/')

def reset_view(request):
    context = {}
    if request.method == 'POST':
        context['sent'] = logic.send_reset_email(request.POST.get('email'))

    return render(request, 'project/reset.html', context)

def apiNewMessage(request):
    # A01:2021 – Broken Access Control
    # CSRF vulnerability
    # Check if the request method is POST.
    # This will require usage of CSRF token.
    # if request.method == 'POST':
    logic.create_message(request)
    return JsonResponse({ 'ok': True })

def apiMessages(request):
    return JsonResponse({ 'messages': logic.get_messages() })
