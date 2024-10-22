from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
import json
from .models import Passageiro
from .forms import PassageiroCreationForm

def login(request):
    return render(request, "Login.html")  # Renderiza a tela inicial

def cadastros(request):
    return render(request, "Cadastro.html")  # Renderiza tela de cadastro secundária


@login_required     #permite acessar essa tela quando estiver autenticado!
def home(request):
    return render(request, "home.html")  # Renderiza tela home


from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  
def Cadastrar(request): # Cadastra o passageiro
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            form = PassageiroCreationForm(data)
            if form.is_valid():
                usuario = form.save()
                return JsonResponse({"message": "Usuario cadastrado com sucesso!"})
            else:
                return JsonResponse({"error": form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON malformado"}, status=400)
        except Exception as e:
            # Adiciona log para debugar o erro
            print(f"Erro ao cadastrar: {e}")  # Pode usar logging também
            return JsonResponse({"error": str(e)}, status=500)

    # Adicione esta linha para o método GET
    return JsonResponse({"error": "Método não permitido"}, status=405)

        
def Login_acessar(request): # Login passageiro pelo email e senha
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
            return JsonResponse({"error": "Usuario não existente"}, status=404)
    
    return JsonResponse({"error": "Método não permitido"}, status=405)
