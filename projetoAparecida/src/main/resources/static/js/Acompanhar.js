async function BuscarReservas() {
    try {
        const resposta = await fetch("http://localhost:8080/api/reservas/BuscarReservas");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar as reservas");
        }

        const reservas = await resposta.json();
        const tabelaReservas = document.getElementById("reservas-lista");

        reservas.forEach(reserva => {
            const row = document.createElement('tr');

            const celulaAssento = document.createElement('td');
            celulaAssento.textContent = reserva.poltrona;
            row.appendChild(celulaAssento);

            const celulaNome = document.createElement('td');
            celulaNome.textContent = reserva.nome;
            row.appendChild(celulaNome);

            const celulaValor = document.createElement('td');
            celulaValor.textContent = reserva.valor;
            row.appendChild(celulaValor);

            const celulaOnibus = document.createElement('td');
            celulaOnibus.textContent = reserva.tipo_onibus;
            row.appendChild(celulaOnibus);

            const celulaData = document.createElement('td');
            const dataFormatada = new Date(reserva.data_reserva).toLocaleDateString('pt-BR');
            celulaData.textContent = dataFormatada;
            row.appendChild(celulaData);

            const celulaStatus = document.createElement('td');
            celulaStatus.textContent = reserva.status;
            row.appendChild(celulaStatus);

            const celulaAcao = document.createElement('td');
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.classList.add("button-excluir");

  
            botaoExcluir.addEventListener('click', () => excluirReserva(reserva.id, row));
            celulaAcao.appendChild(botaoExcluir);
            row.appendChild(celulaAcao);

            tabelaReservas.appendChild(row);
        });

    } catch (erro) {
        const mensagem = document.getElementById('mensagem');
        mensagem.textContent = 'Erro ao carregar as reservas. Tente novamente mais tarde.';
    }
}

async function excluirReserva(id, row) {
    try {
        const resposta = await fetch(`http://localhost:8080/api/reservas/Deletar/${id}`, {
            method: 'DELETE',
        });

        if (resposta.ok) {
            alertar();
            row.remove();
        } else {
            console.error("Erro na resposta:", resposta.status, resposta.statusText);
            alert(`Erro ao excluir a reserva. Código: ${resposta.status}`);
        }
    } catch (erro) {
        console.error("Erro ao fazer a requisição:", erro);
        alert("Não foi possível excluir a reserva. Tente novamente.");
    }
}

function alertar() {
    const alertaSucesso = document.querySelector("#alertaSucesso");

    alertaSucesso.style.display = "block";

    setTimeout(() => {
        alertaSucesso.style.display = "none";
    }, 3000);
}

async function BuscarPorNome() {
    try {
        const pesquisa = document.getElementById("pesquisa").value; 
        const tabelaReservas = document.getElementById("reservas-lista");
        
        
        if (!pesquisa) {
            await BuscarReservas();
            return;
        }

        const resposta = await fetch(`http://localhost:8080/api/reservas/BuscarPorNome/${encodeURIComponent(pesquisa)}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar as reservas");
        }

        const reservas = await resposta.json();
        tabelaReservas.innerHTML = "";  

        reservas.forEach(reserva => {
            const row = document.createElement('tr');

            const celulaAssento = document.createElement('td');
            celulaAssento.textContent = reserva.poltrona;
            row.appendChild(celulaAssento);

            const celulaNome = document.createElement('td');
            celulaNome.textContent = reserva.nome;
            row.appendChild(celulaNome);

            const celulaValor = document.createElement('td');
            celulaValor.textContent = reserva.valor;
            row.appendChild(celulaValor);

            const celulaOnibus = document.createElement('td');
            celulaOnibus.textContent = reserva.tipo_onibus;
            row.appendChild(celulaOnibus);

            const celulaData = document.createElement('td');
            const dataFormatada = new Date(reserva.data_reserva).toLocaleDateString('pt-BR');
            celulaData.textContent = dataFormatada;
            row.appendChild(celulaData);

            const celulaStatus = document.createElement('td');
            celulaStatus.textContent = reserva.status;
            row.appendChild(celulaStatus);

            const celulaAcao = document.createElement('td');
            const botaoExcluir = document.createElement('button');
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.classList.add("button-excluir");

            botaoExcluir.addEventListener('click', () => excluirReserva(reserva.id, row));
            celulaAcao.appendChild(botaoExcluir);
            row.appendChild(celulaAcao);

            tabelaReservas.appendChild(row);
        });

    } catch (erro) {
        console.error("Erro ao carregar as reservas: ", erro); 
    }
}


document.getElementById('pesquisa').addEventListener('input', BuscarPorNome);
document.addEventListener('DOMContentLoaded', BuscarReservas);
