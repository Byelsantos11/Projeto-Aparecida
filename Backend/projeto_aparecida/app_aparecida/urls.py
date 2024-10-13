
from django.urls import path
from .views import Login, Cadastrar, Home

urlpatterns = [
    path('', Login, name="Login"), #URL login
    path('Cadastrar/', Cadastrar, name="Cadastrar"), #URL cadastro
    path('Home/', Home, name="Home")
]
