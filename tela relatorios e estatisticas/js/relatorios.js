document.addEventListener("DOMContentLoaded", function () {
    carregarEstatisticas();
    carregarReservas();
    carregarHistoricoReservas();

    document.getElementById('btn-filtrar').addEventListener('click', () => {
        carregarReservas();
        carregarHistoricoReservas();
    });
});

async function carregarEstatisticas() {
    try {
        const res = await fetch('/api/relatorios/estatisticas');
        const dados = await res.json();

        document.getElementById('total-reservas').innerText = dados.totalReservas;
        document.getElementById('assentos-disponiveis').innerText = dados.assentosDisponiveis;
        document.getElementById('assentos-ocupados').innerText = dados.assentosOcupados;

        const ctx = document.getElementById('graficoEstatisticas').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total de Reservas', 'Assentos Disponíveis', 'Assentos Ocupados'],
                datasets: [{
                    label: 'Estatísticas',
                    data: [dados.totalReservas, dados.assentosDisponiveis, dados.assentosOcupados],
                    backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
                    borderColor: ['#388E3C', '#F57C00', '#D32F2F'],
                    borderWidth: 1
                }]
            }
        });
    } catch (err) {
        console.error('Erro ao carregar as estatísticas:', err);
    }
}

async function carregarReservas() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const statusReserva = document.getElementById('statusReserva').value;

    const queryParams = new URLSearchParams({ dataInicio, dataFim, statusReserva });
    try {
        const res = await fetch(`/api/relatorios/reservas?${queryParams}`);
        
        if (!res.ok) {
            throw new Error('Erro ao carregar as reservas');
        }
        
        const reservas = await res.json();
        const tabelaReservas = document.getElementById('tabela-reservas');
        tabelaReservas.innerHTML = '';
        
        reservas.forEach(reserva => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reserva.id}</td>
                <td>${reserva.assento}</td>
                <td>${reserva.status}</td>
                <td>${new Date(reserva.created_at).toLocaleString()}</td>
                <td><button onclick="cancelarReserva(${reserva.id})">Cancelar</button></td>
            `;
            tabelaReservas.appendChild(row);
        });
    } catch (err) {
        console.error('Erro ao carregar as reservas:', err);
    }
}

async function carregarHistoricoReservas() {
    try {
        const res = await fetch('/api/relatorios/historico');
        
        if (!res.ok) {
            throw new Error('Erro ao carregar o histórico de reservas');
        }
        
        const historico = await res.json();
    } catch (err) {
        console.error('Erro ao carregar histórico de reservas:', err);
    }
}

async function cancelarReserva(id) {
    try {
        const res = await fetch(`/api/relatorios/cancelar/${id}`, { method: 'POST' });
        if (!res.ok) {
            throw new Error('Erro ao cancelar a reserva');
        }
        alert(`Reserva ${id} cancelada!`);
        carregarReservas();
    } catch (error) {
        console.error(`Erro ao cancelar a reserva ${id}:`, error);
    }
}
