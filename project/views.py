from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


def index(request):
    return render(request, 'project/index.html')

def login(request):
    return render(request, 'project/login.html')

def apiNewMessage(request):
    # A01:2021 – Broken Access Control 
    return HttpResponse()

def apiMessages(request):
    return JsonResponse({ 'messages': [
        {
            'name': 'mudkipz4ever',
            'message': 'dis is kewl website!'
        },
        {
            'name': 'mudkipz4ever',
            'message': 'i herd u liek mudkipz?'
        },
        {
            'name': 'xXWorf420Xx',
            'message': 'No, I do not.'
        },
        {
            'name': 'xXWorf420Xx',
            'message': "I like Star Trek. It's the greatest show ever!"
        },
        {
            'name': 'usetheforce',
            'message': 'No, it is not! You are stupid!'
        },
        {
            'name': 'xXWorf420Xx',
            'message': 'Pethaps you should get a life!'
        },
        {
            'name': 'usetheforce',
            'message': '"pethaps" lol!'
        },
        {
            'name': 'usetheforce',
            'message': "Can't even type!"
        },
        {
            'name': 'xXWorf420Xx',
            'message': 'Typical Star Wars fan behavior.'
        },
        {
            'name': 'usetheforce',
            'message': 'Nah, ur just mad bro'
        }
    ]})
