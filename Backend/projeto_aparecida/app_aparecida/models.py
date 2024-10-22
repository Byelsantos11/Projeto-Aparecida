from django.db import models
from django.contrib.auth.models import AbstractUser

class Passageiro(AbstractUser):
    username = models.CharField(max_length=50, default='sem nome', unique=True)
    email = models.EmailField(max_length=50, unique=True) 
    rg = models.CharField(max_length=50, unique=True, default="RG Padrão")  # Valor padrão
    cpf = models.CharField(max_length=115, unique=True, default="00000000000")  
    cep = models.CharField(max_length=15, default="00000000")
    logradouro = models.CharField(max_length=255, default="Sem Logradouro")  
    telefone = models.CharField(max_length=15, default="0")  
    tipo_usuario = models.CharField(max_length=20)

    def __str__(self):
        return self.nome
