from django.shortcuts import render , redirect

def home(req):
    return render(req, 'home.html')
