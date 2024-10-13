# app_aparecida/forms.py
from django import forms
from .models import Passageiro

class PassageiroCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Senha")

    class Meta:
        model = Passageiro
        fields = ('nome', 'email', 'documento', 'telefone', 'numero_acompanhante', 'password')


    def clean_email(self): #Função de vereficar se existe um email igual
        email = self.cleaned_data.get('email')
        if Passageiro.objects.filter(email=email).exists():
            raise forms.ValidationError("Email já está sendo utilizado.")
        return email
