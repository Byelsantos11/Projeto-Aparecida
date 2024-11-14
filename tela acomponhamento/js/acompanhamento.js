async function carregarReservas(termoPesquisa = '') {
    try {
        const response = await fetch(`http://localhost:3000/api/assentos/reservas?termo=${termoPesquisa}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar reservas');
        }

        const reservas = await response.json();
        const reservasTabela = document.getElementById('reservas-lista');
        reservasTabela.innerHTML = '';

        if (reservas.length === 0) {
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Nenhuma reserva encontrada.';
            mensagem.classList.add('empty');
            return;
        }

        const nomeOrdenador = "João Silva";
        document.getElementById('nome-ordenador').innerHTML = `Ordenador responsável: <strong>${nomeOrdenador}</strong>`;

        reservas.forEach(reserva => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${reserva.assento}</td>
                <td>${reserva.nome}</td>
                <td>${new Date(reserva.created_at).toLocaleString('pt-BR')}</td>
                <td><button class="button-cancel" data-id="${reserva.id}">Cancelar Reserva</button></td>
            `;
            reservasTabela.appendChild(tr);
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
        console.error('Erro ao carregar reservas:', error);
        alert('Erro ao carregar reservas.');
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
        carregarReservas();
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        alert('Erro ao cancelar reserva.');
    }
}

document.addEventListener('DOMContentLoaded', () => carregarReservas());

document.getElementById('voltar-reservas-btn').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/';
});

document.getElementById('pesquisar-btn').addEventListener('click', () => {
    const termo = document.getElementById('pesquisa-reserva').value.toLowerCase();
    carregarReservas(termo);
});
