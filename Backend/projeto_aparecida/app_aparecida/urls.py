
from django.urls import path
from .views import Cadastrar, login, cadastros, Cadastrar, Login_acessar

urlpatterns = [
    path('', login, name="login"),#URL tela Login
    path('cadastros/', cadastros, name="cadastros"), #URL tela cadastros
    path('Cadastrar/', Cadastrar, name="Cadastrar"), #URL para cadastrar
    path('login_acessar/', Login_acessar, name= "login_acessar") #URL para logar
]
