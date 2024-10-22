# app_aparecida/forms.py
from django import forms
from .models import Passageiro

class PassageiroCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Senha", required=True)

    class Meta:
        model = Passageiro
        fields = ('nome', 'email', 'rg', 'cpf', 'cep', 'logradouro', 'telefone', 'tipo_usuario', 'password')

    def save(self, commit=True):
        usuario = super().save(commit=False)
        usuario.set_password(self.cleaned_data['password'])  # Usa o método correto para salvar a senha criptografando a senha
        if commit:
            usuario.save()
        return usuario
