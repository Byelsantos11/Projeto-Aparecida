async function carregarReservas() {
    try {
        const response = await fetch('http://localhost:3000/api/assentos/reservas');
        if (!response.ok) {
            throw new Error('Erro ao carregar reservas');
        }

        const reservas = await response.json();
        const reservasTabela = document.getElementById('reservas-lista');
        reservasTabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (reservas.length === 0) {
            const mensagem = document.getElementById('mensagem');
            mensagem.textContent = 'Nenhuma reserva encontrada.';
            mensagem.classList.add('empty');
            return;
        }

        // Exemplo de nome do ordenador. Você pode substituir ou definir dinamicamente
        const nomeOrdenador = "João Silva"; // Aqui você pode atribuir o nome do ordenador de alguma fonte
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

        // Adicione evento de clique aos botões de cancelamento
        document.querySelectorAll('.button-cancel').forEach(button => {
            button.addEventListener('click', () => {
                const reservaId = button.getAttribute('data-id');
                console.log('ID da reserva:', reservaId); // Verifica se o ID está sendo passado
                
                // Mensagem de confirmação antes de cancelar
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
    console.log('Cancelando reserva com ID:', id); // Verifica o ID que está sendo passado
    try {
        const response = await fetch(`http://localhost:3000/api/assentos/cancelar/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao cancelar reserva');
        }
        
        alert('Reserva cancelada com sucesso!');
        carregarReservas(); // Recarrega as reservas após o cancelamento
    } catch (error) {
        console.error('Erro ao cancelar reserva:', error);
        alert('Erro ao cancelar reserva.');
    }
}

// Chama a função para carregar reservas quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarReservas);
document.getElementById('voltar-reservas-btn').addEventListener('click', function() {
    // Redireciona para a tela de reservas
    window.location.href = 'http://localhost:3000/'; // Redireciona para a tela de reservas
});
