from django.shortcuts import render


def Login(request):
    return render(request, "Login.html") #Renderiza a tela inicial


def Cadastrar(request):
    return render (request, "Cadastro.html") #Renderiza tela de cadastro secundaria
 
 
 
 
 
 