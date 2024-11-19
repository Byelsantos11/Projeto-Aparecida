async function carregarOnibus() {
    const tabelaCorpo = document.getElementById('onibus-tabela-corpo');
    const carregandoMensagem = document.getElementById('carregando-mensagem');
    const erroMensagem = document.getElementById('erro-mensagem');

   
    carregandoMensagem.style.display = 'block';
    erroMensagem.style.display = 'none';

    try {
        
        const response = await fetch('http://localhost:3000/api/onibus');
        if (!response.ok) throw new Error('Erro ao carregar ônibus');

        
        const onibus = await response.json();
        tabelaCorpo.innerHTML = ''; 

       
        onibus.forEach(veiculo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(veiculo.id)}</td>
                <td>${escapeHTML(veiculo.placa)}</td>
                <td>${escapeHTML(veiculo.modelo)}</td>
                <td>${escapeHTML(veiculo.capacidade)}</td>
                <td>
                    <button class="edit-btn" aria-label="Editar ônibus" onclick="editarOnibus(${veiculo.id})">Editar</button>
                    <button class="delete-btn" aria-label="Excluir ônibus" onclick="excluirOnibus(${veiculo.id})">Excluir</button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar ônibus:', error);
        erroMensagem.style.display = 'block'; 
    } finally {
        carregandoMensagem.style.display = 'none'; 
    }
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function editarOnibus(id) {
    alert(`Editar ônibus com ID: ${id}`);
    
}

async function excluirOnibus(id) {
    const confirmacao = confirm('Tem certeza que deseja excluir este ônibus?');
    if (!confirmacao) return;

    try {
        
        const response = await fetch(`http://localhost:3000/api/onibus/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao excluir ônibus');

        alert('Ônibus excluído com sucesso!');
        carregarOnibus(); 
    } catch (error) {
        console.error('Erro ao excluir ônibus:', error);
    }
}


document.addEventListener('DOMContentLoaded', carregarOnibus);
