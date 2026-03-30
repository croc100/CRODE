# main/views.py
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def lab(request):
    return render(request, 'lab.html')