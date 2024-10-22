from django import forms
from .models import Passageiro

class PassageiroCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Senha", required=True)

    class Meta:
        model = Passageiro
        fields = ('username', 'email', 'rg', 'cpf', 'cep', 'logradouro', 'telefone', 'tipo_usuario', 'password')

    def save(self, commit=True):
        usuario = super().save(commit=False)
        usuario.set_password(self.cleaned_data['password'])
        if commit:
            usuario.save()
        return usuario


USERNAME_FIELD = 'email'  # Define o campo que será usado para autenticação
REQUIRED_FIELDS = ['username', 'email', 'rg', 'cpf']  # Campos obrigatórios
