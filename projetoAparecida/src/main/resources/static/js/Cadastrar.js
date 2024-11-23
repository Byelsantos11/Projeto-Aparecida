document.getElementById('tipo').addEventListener('change', function() {
    var tipoUsuario = this.value;
    var motoristaInfo = document.getElementById('motorista-info');
    motoristaInfo.style.display = (tipoUsuario === 'motorista') ? 'block' : 'none';
});

function validarCampos(nome, rg, cpf, logradouro, cep, telefone, email, senha, tipo) {
    if (!nome || !rg || !cpf || !logradouro || !cep || !telefone || !email || !senha || !tipo) {
        alerta('Por favor, preencha todos os campos obrigatórios.', 'danger');
        return false;
    }
    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alerta('Por favor, insira um email válido.', 'danger');
        return false;
    }
    return true;
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let rg = document.getElementById('rg').value;
    let cpf = document.getElementById('cpf').value;
    let logradouro = document.getElementById('logradouro').value;
    let cep = document.getElementById('cep').value;
    let tipo = document.getElementById('tipo').value;
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefone').value;
    let senha = document.getElementById('senha').value;

    var numeroHabilitacao = document.getElementById('numeroHabilitacao').value || null;
    var certificacoes = document.getElementById('certificacoes').value || null;

    if (!validarCampos(nome, rg, cpf, logradouro, cep, telefone, email, senha, tipo)) {
        return;
    }

    let usuario = {
        nome: nome,
        rg: rg,
        cpf: cpf,
        logradouro: logradouro,
        cep: cep,
        tipo_usuario: tipo,
        email: email,
        telefone: telefone,
        senha: senha,
        motorista_info: tipo === 'motorista' ? {
            numero_habilitacao: numeroHabilitacao,
            certificacoes: certificacoes ? certificacoes.split(',') : []
        } : null
    };

   
    let url = tipo === 'coordenador' 
              ? 'http://localhost:8080/api/coordenadores/cadastroCoord' 
              : 'http://localhost:8080/api/passageiros/cadastro';

    fetch(url, {
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
        alertaCoord()
        document.getElementById('cadastroForm').reset();
    })
    .catch(error => {
        alerta(error.message || 'Erro inesperado.', 'danger');
    });
});

function alerta() {
    const alerta = document.getElementById("alerta");

    if (alerta.style.display === "none" || alerta.style.display === "") {
        alerta.style.display = "block";

        setTimeout(() => {
            alerta.style.display = "none";
			window.location.href= "/Login.html"
        }, 3000);
    }
}
