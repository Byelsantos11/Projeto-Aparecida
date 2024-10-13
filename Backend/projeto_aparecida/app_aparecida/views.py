from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import PassageiroCreationForm
from django.contrib.auth import authenticate, login
import json
from django.views.decorators.csrf import csrf_exempt



def Login(request):
    return render(request, "Login.html") #Renderiza a tela inicial


def Cadastrar(request):
    return render (request, "Cadastro.html") #Renderiza tela de cadastro secundaria


def Home(request):
    return render (request, "Home.html") #Renderiza tela home

  
@csrf_exempt
def register_passageiro(request):  #Registrar usuário no sistema
    if request.method == 'POST':
        data = json.loads(request.body)
        form = PassageiroCreationForm(data)

        if form.is_valid():
            passageiro = form.save(commit=False)
            passageiro.set_password(data['password'])  
            passageiro.save()
            return JsonResponse({'status': 'success', 'message': 'Passageiro registrado com sucesso.'}, status=201)
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
        
        
        
def login_passageiro(request): #Logar usuário no sistema
    if request.method=="POST":
        data= json.loads(request.body)
        email= data.get("email")
        senha= data.get("senha")
        
        usuario= authenticate(request, username=email, password=senha)
        
        if usuario is not None:
            login(request, usuario)
            redirect ("Home")
        
       
            
        
        
 
 
 
 
 
 