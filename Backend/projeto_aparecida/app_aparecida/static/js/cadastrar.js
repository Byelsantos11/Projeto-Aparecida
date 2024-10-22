// Função para exibir ou ocultar campos de acordo com o tipo de usuário
document.getElementById('tipo').addEventListener('change', function() {
    var tipoUsuario = this.value;
    var motoristaInfo = document.getElementById('motorista-info');

    motoristaInfo.style.display = (tipoUsuario === 'motorista') ? 'block' : 'none';
});

// Função para exibir feedback visual
function exibirFeedback(mensagem, tipo) {
    var feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.innerHTML = mensagem;
    feedbackMessage.className = 'alert alert-' + tipo; // Definir classe de Bootstrap para sucesso ou erro
    feedbackMessage.style.display = 'block'; // Mostrar a mensagem
    feedbackMessage.setAttribute('aria-live', 'polite'); // Para acessibilidade
}

// Função para validar campos do formulário
function validarCampos(nome, rg, cpf, logradouro, cep, telefone, email, senha, tipo) {
    if (!nome || !rg || !cpf || !logradouro || !cep || !telefone || !email || !senha || !tipo) {
        exibirFeedback('Por favor, preencha todos os campos obrigatórios.', 'danger');
        return false;
    }
    // Exemplo de validação básica de email (pode ser expandido conforme necessário)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        exibirFeedback('Por favor, insira um email válido.', 'danger');
        return false;
    }
    return true;
}

// Função de envio do formulário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtenção dos valores dos campos
    var nome = document.getElementById('nome').value;
    var rg = document.getElementById('rg').value;
    var cpf = document.getElementById('cpf').value;
    var logradouro = document.getElementById('logradouro').value;
    var numero = document.getElementById('numero') ? document.getElementById('numero').value : null; // Tratamento para o número, se existir
    var cep = document.getElementById('cep').value;
    var tipo = document.getElementById('tipo').value; // 'tipo_usuario'
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var senha = document.getElementById('senha').value; // 'password'

    var numeroHabilitacao = document.getElementById('numeroHabilitacao').value || null;
    var certificacoes = document.getElementById('certificacoes').value || null;

    // Validação dos campos
    if (!validarCampos(nome, rg, cpf, logradouro, cep, telefone, email, senha, tipo)) {
        return; // Interrompe o envio se houver erro
    }

    // Criação do objeto de usuário para enviar ao backend
    var usuario = {
        nome: nome,
        rg: rg,
        cpf: cpf,
        logradouro: logradouro,
        numero: numero,
        cep: cep,
        tipo_usuario: tipo, 
        email: email,
        telefone: telefone,
        password: senha, 
        motorista_info: tipo === 'motorista' ? {
            numero_habilitacao: numeroHabilitacao,
            certificacoes: certificacoes ? certificacoes.split(',') : []
        } : null
    };

    // Requisição Fetch para o backend
    fetch('http://127.0.0.1:8000/Cadastrar/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            return response.json().then(errData => {
                throw new Error(errData.error || 'Erro no cadastro'); 
            });
        }
    })
    .then(data => {
        // Exibir mensagem de sucesso
        exibirFeedback('Usuário cadastrado com sucesso!', 'success');
        document.getElementById('cadastroForm').reset(); // Limpa o formulário
        document.getElementById('feedbackMessage').style.display = 'none'; // Esconde a mensagem após o sucesso
    })
    .catch(error => {
        // Exibir mensagem de erro
        exibirFeedback('Erro no cadastro: ' + error.message, 'danger');
    });
});
