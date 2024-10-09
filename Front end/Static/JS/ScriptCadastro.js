// Função para exibir ou ocultar campos de acordo com o tipo de usuário
document.getElementById('tipo').addEventListener('change', function() {
    var tipoUsuario = this.value;
    var motoristaInfo = document.getElementById('motorista-info');
    var acompanhantes = document.getElementById('acompanhantes');
    
    motoristaInfo.style.display = (tipoUsuario === 'motorista') ? 'block' : 'none';
    acompanhantes.style.display = (tipoUsuario === 'passageiro') ? 'block' : 'none';
});

// Função de envio do formulário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtenção dos valores dos campos
    var nome = document.getElementById('nome').value;
    var documento = document.getElementById('documento').value;
    var tipo = document.getElementById('tipo').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var senha = document.getElementById('senha').value;

    var quantidadeAcompanhantes = document.getElementById('quantidadeAcompanhantes').value || null;
    var numeroHabilitacao = document.getElementById('numeroHabilitacao').value || null;
    var certificacoes = document.getElementById('certificacoes').value || null;

    // Criação do objeto de usuário com base no banco de dados
    var usuario = {
        nome: nome,
        documento: documento,
        tipo: tipo,
        email: email,
        telefone: telefone,
        senha: senha,
        quantidade_acompanhantes: tipo === 'passageiro' ? parseInt(quantidadeAcompanhantes) : null,
        motorista_info: tipo === 'motorista' ? {
            numero_habilitacao: numeroHabilitacao,
            certificacoes: certificacoes ? certificacoes.split(',') : []
        } : null,
        created_at: new Date(),
        updated_at: new Date()
    };

    // Exibição no console (aqui você pode enviar os dados ao backend)
    console.log('Usuário cadastrado:', usuario);

    // Lógica de envio para o backend pode ser adicionada aqui (AJAX, fetch, etc.)
});
