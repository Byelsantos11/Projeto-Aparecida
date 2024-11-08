document.addEventListener('DOMContentLoaded', () => {
    carregarInformacoesUsuario();
    carregarHistoricoReservas();
});

function mostrarCarregamento(elemento) {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    elemento.appendChild(loader);
}

function esconderCarregamento(elemento) {
    const loader = elemento.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

async function carregarInformacoesUsuario() {
    try {
        mostrarCarregamento(document.body);
        const response = await fetch('http://localhost:3000/api/usuario');
        const usuario = await response.json();
        
        document.getElementById('nome-usuario').textContent = usuario.nome;
        document.getElementById('email-usuario').textContent = usuario.email;
        document.getElementById('cartao-pagamento').textContent = `**** **** **** ${usuario.cartao.slice(-4)}`;
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    } finally {
        esconderCarregamento(document.body);
    }
}

async function carregarHistoricoReservas() {
    try {
        mostrarCarregamento(document.body);
        const response = await fetch('http://localhost:3000/api/usuario/reservas');
        const reservas = await response.json();
        const historicoTabela = document.getElementById('historico-lista');
        
        reservas.forEach(reserva => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${reserva.assento}</td>
                <td>${new Date(reserva.data).toLocaleDateString('pt-BR')}</td>
                <td>${reserva.status}</td>
                <td><button class="button-cancel" data-id="${reserva.id}">Cancelar Reserva</button></td>
            `;
            historicoTabela.appendChild(tr);
        });

        document.querySelectorAll('.button-cancel').forEach(button => {
            button.addEventListener('click', () => {
                const reservaId = button.getAttribute('data-id');
                const confirmCancel = confirm('Você tem certeza que deseja cancelar esta reserva?');
                if (confirmCancel) {
                    cancelarReserva(reservaId);
                }
            });
        });
    } catch (error) {
        console.error('Erro ao carregar histórico de reservas:', error);
    } finally {
        esconderCarregamento(document.body);
    }
}

async function cancelarReserva(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/assentos/cancelar/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao cancelar reserva');
        }
        
        alert('Reserva cancelada com sucesso!');
        carregarHistoricoReservas();
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        alert('Erro ao cancelar reserva.');
    }
}

document.getElementById('editar-informacoes').addEventListener('click', () => {
    document.getElementById('editar-informacoes-form').style.display = 'block';
    document.getElementById('editar-informacoes').style.display = 'none';
});

document.getElementById('salvar-edicao').addEventListener('click', async () => {
    const nome = document.getElementById('novo-nome').value;
    const email = document.getElementById('novo-email').value;

    if (!nome || !email) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/usuario/editar', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar alterações');
        }

        alert('Informações atualizadas com sucesso!');
        carregarInformacoesUsuario();
        document.getElementById('editar-informacoes-form').style.display = 'none';
        document.getElementById('editar-informacoes').style.display = 'block';
    } catch (error) {
        console.error('Erro ao editar informações:', error);
        alert('Erro ao salvar alterações.');
    }
});

document.getElementById('cancelar-edicao').addEventListener('click', () => {
    document.getElementById('editar-informacoes-form').style.display = 'none';
    document.getElementById('editar-informacoes').style.display = 'block';
});

document.getElementById('gerenciar-pagamento').addEventListener('click', () => {
    document.getElementById('alterar-cartao-form').style.display = 'block';
});

document.getElementById('salvar-cartao').addEventListener('click', async () => {
    const cartao = document.getElementById('novo-cartao').value;
    if (!cartao) {
        alert('Por favor, insira o número do cartão.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/usuario/pagamento', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartao })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar método de pagamento');
        }

        alert('Método de pagamento atualizado com sucesso!');
        carregarInformacoesUsuario();
        document.getElementById('alterar-cartao-form').style.display = 'none';
    } catch (error) {
        console.error('Erro ao salvar método de pagamento:', error);
        alert('Erro ao salvar método de pagamento.');
    }
});

document.getElementById('cancelar-cartao').addEventListener('click', () => {
    document.getElementById('alterar-cartao-form').style.display = 'none';
});

document.getElementById('voltar').addEventListener('click', () => {
    window.history.back();
});
