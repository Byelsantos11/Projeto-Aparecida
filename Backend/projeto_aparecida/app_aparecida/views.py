from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from .models import Passageiro
from .forms import PassageiroCreationForm

def Login(request):
    return render(request, "Login.html")  # Renderiza a tela inicial

def cadastros(request):
    return render(request, "Cadastro.html")  # Renderiza tela de cadastro secundária


@login_required     #permite acessar essa tela quando estiver autenticado!
def home(request):
    return render(request, "Home.html")  # Renderiza tela home


def Cadastrar(request): #Função de cadastrar usuario e enviar menssagem de sucesso!
    if request.method=="POST":
        form= PassageiroCreationForm(request.POST)
        if form.is_valid():
            usuario= form.save()
            return JsonResponse({"message": "Usuario cadastrado com sucesso!"})
        else:
            return JsonResponse({"error": form.errors}, status=400)
        
def Login_acessar(request):
    if request.method == "POST":
        email = request.POST['email']
        senha = request.POST['password']  
        
        try:
            user = Passageiro.objects.get(email=email) 
            user = authenticate(request, username=user.username, password=senha)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login com sucesso!"})
            else:
                return JsonResponse({"error": "Credenciais Inválidas"}, status=401)
        except Passageiro.DoesNotExist:
            return JsonResponse({"error", "Usuario não existente"}, status=404)
    
    return JsonResponse({"error", "Método não permitido"}, status=405)
