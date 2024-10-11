
from django.urls import path
from .views import Login, Cadastrar

urlpatterns = [
    path('', Login, name="Login"), #URL login
    path('Cadastrar/', Cadastrar, name="Cadastrar") #URL cadastro
]
