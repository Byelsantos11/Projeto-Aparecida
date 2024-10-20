# app_aparecida/forms.py
from django import forms
from .models import Passageiro


class PassageiroCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Senha")

    class Meta:
        model = Passageiro
        fields = ('nome', 'email', 'rg', 'cpf', 'cep', 'logradouro', 'numero', 'tipo_usuario')

    def save(self, commit=True):
        usuario = super().save(commit=False)
        usuario.set_password(self.cleaned_data['senha'])  # Usa o método correto para salvar a senha cripgrafando a senha
        if commit:
            usuario.save()
        return usuario