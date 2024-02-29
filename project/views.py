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
    if not request.user.is_authenticated:
        return redirect('/')

    context = {}
    if request.method == 'POST':
        context['result'] = logic.reset_password(request)

    return render(request, 'project/reset.html', context)

def apiNewMessage(request):
    # A01:2021 – Broken Access Control
    # CWE-352 Cross-Site Request Forgery (CSRF)
    # Check if the request method is POST.
    # This will require usage of CSRF token.
    # if request.method == 'POST':
    ok = logic.create_message(request)
    return JsonResponse({ 'ok': ok })
