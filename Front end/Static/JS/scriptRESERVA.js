// Lógica para selecionar e reservar assentos
document.querySelectorAll('.assento').forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('reservado')) {
            button.classList.toggle('selecionado'); // Adiciona/remover a classe 'selecionado'
        }
    });
});

document.querySelector('.reservar-btn').addEventListener('click', async () => {
    const assentosSelecionados = Array.from(document.querySelectorAll('.assento.selecionado')).map(button => button.dataset.assento);
    
    if (assentosSelecionados.length === 0) {
        alert('Por favor, selecione ao menos um assento.');
        return;
    }

    // Solicita o nome do usuário para a reserva
    const nome = prompt("Digite seu nome:");
    if (!nome) {
        alert('Nome é necessário para a reserva.');
        return;
    }

    const botaoReservar = document.querySelector('.reservar-btn');
    botaoReservar.disabled = true; // Desativa o botão

    const indicadorCarregamento = document.createElement('div');
    indicadorCarregamento.textContent = 'Reservando...';
    document.body.appendChild(indicadorCarregamento); // Adiciona ao DOM

    try {
        const response = await fetch('http://localhost:3000/api/assentos/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ assento: assentosSelecionados, nome: nome }), // Envia o nome com a lista de assentos
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            // Muda a cor dos assentos para vermelho
            assentosSelecionados.forEach(assento => {
                const button = document.querySelector(`.assento[data-assento="${assento}"]`);
                if (button) {
                    button.classList.remove('selecionado');
                    button.classList.add('reservado'); // Adiciona a classe 'reservado'
                }
            });
        } else {
            const errorMessage = data.message || 'Ocorreu um erro ao processar sua reserva.';
            alert('Erro: ' + errorMessage);
        }
    } catch (error) {
        console.error('Erro ao fazer reserva:', error);
        alert('Erro ao fazer reserva.');
    } finally {
        botaoReservar.disabled = false; // Reativa o botão
        indicadorCarregamento.remove(); // Remove o indicador de carregamento
    }
});
