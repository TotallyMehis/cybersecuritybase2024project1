from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return HttpResponse('Hello, world.')

def detail(request, id):
    return HttpResponse(f'Id: {id}')

def rendertest(request):
    context = { 'test': 'hello world' }
    return render(request, 'project/index.html', context)