// Seleção dos elementos
const modal = document.getElementById('modalReserva');
const closeModal = document.getElementById('closeModal');
const btnReservar = document.getElementById('btnReservar');
const formReserva = document.getElementById('formReserva');
const assentoInput = document.getElementById('assento');

function abrirModal(assento) {
    assentoInput.value = assento;
    modal.style.display = 'flex';  
}

closeModal.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

const assentos = document.querySelectorAll('.assento');
assentos.forEach(assento => {
    assento.addEventListener('click', function() {
        assentos.forEach(a => a.classList.remove('selecionado'));
        
        if (!assento.classList.contains('reservado')) {
            assento.classList.add('selecionado');
            abrirModal(assento.getAttribute('data-assento'));
        } else {
            alert('Este assento já está ocupado.');
        }
    });
});

// Função para marcar os assentos como reservados
function marcarAssentosReservados(reservas) {
    reservas.forEach(reserva => {
        const assentoReservado = document.querySelector(`[data-assento="${reserva.poltrona}"]`);
        if (assentoReservado) {
            assentoReservado.classList.add('reservado');
        }
    });
}

// Função para buscar as reservas
function buscarReservas() {
    fetch('http://localhost:8080/api/reservas/BuscarReservas') 
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Verifique o formato dos dados
            marcarAssentosReservados(data);
        })
        .catch(error => {
            console.error('Erro ao buscar as reservas:', error);
        });
}

// Função para realizar a reserva
formReserva.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const assento = assentoInput.value;

    const dados = {
        "nome": nome,
        "valor": 150.0,
        "poltrona": assento,
        "tipo_onibus": "A",
        "data_reserva": "2024-11-15",
        "onibus": {
            "id": 1
        }
    };

    // Enviar os dados para o backend (POST)
    fetch('http://localhost:8080/api/reservas/criarReservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha ao realizar a reserva');
        }
        return response.json();
    })
    .then(data => {
        lembreteSucesso();
        modal.style.display = 'none';
        const assentoReservado = document.querySelector(`[data-assento="${assento}"]`);
        if (assentoReservado) {
            assentoReservado.classList.add('reservado');
        }
    })
    .catch(error => {
        console.error('Erro na reserva:', error);
        alert('Erro ao realizar a reserva. Tente novamente.');
    });
});

// Função para exibir a mensagem de sucesso
function lembreteSucesso() {
    const alertaSucesso = document.querySelector("#alertaSucesso");
    alertaSucesso.style.display = "block";
    setTimeout(() => {
        alertaSucesso.style.display = "none";
		window.location.href="/Acompanhar.html"
    }, 1000);
}

// Função de fechamento e busca ao carregar a página
window.onload = function() {
    buscarReservas();
};



