# main/views.py
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def lab(request):
    return render(request, 'lab.html')

def services(request):
    return render(request, 'services.html')

def lib(request):
    return render(request, 'lib.html')