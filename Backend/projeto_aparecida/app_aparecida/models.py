from django.db import models
from django.contrib.auth.models import AbstractUser

class Passageiro(AbstractUser): #Classe Passageiro
    nome = models.CharField(max_length=100)
    documento = models.CharField(max_length=50)
    telefone = models.CharField(max_length=30)
    numero_acompanhante = models.IntegerField(default=0)
    email = models.EmailField(unique=True, max_length=100)

    USERNAME_FIELD = 'email'  
    REQUIRED_FIELDS = ['nome']  

    def __str__(self):
        return self.nome
