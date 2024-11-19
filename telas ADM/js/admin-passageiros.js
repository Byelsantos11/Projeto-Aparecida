async function carregarPassageiros() {
    const tabelaCorpo = document.getElementById('passageiros-tabela-corpo');
    const carregandoMensagem = document.getElementById('carregando-mensagem');
    const erroMensagem = document.getElementById('erro-mensagem');

    
    carregandoMensagem.style.display = 'block';
    erroMensagem.style.display = 'none';

    try {
       
        const response = await fetch('http://localhost:3000/api/passageiros');
        if (!response.ok) throw new Error('Erro ao carregar passageiros');

       
        const passageiros = await response.json();
        tabelaCorpo.innerHTML = ''; 

        
        passageiros.forEach(passageiro => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(passageiro.id)}</td>
                <td>${escapeHTML(passageiro.nome)}</td>
                <td>${escapeHTML(passageiro.email)}</td>
                <td>${escapeHTML(passageiro.telefone)}</td>
                <td>
                    <button class="edit-btn" aria-label="Editar passageiro" onclick="editarPassageiro(${passageiro.id})">Editar</button>
                    <button class="delete-btn" aria-label="Excluir passageiro" onclick="excluirPassageiro(${passageiro.id})">Excluir</button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar passageiros:', error);
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

function editarPassageiro(id) {
    alert(`Editar passageiro com ID: ${id}`);
    
}

function excluirPassageiro(id) {
    if (confirm(`Tem certeza de que deseja excluir o passageiro com ID: ${id}?`)) {
        alert(`Excluir passageiro com ID: ${id}`);
        
    }
}


document.addEventListener('DOMContentLoaded', carregarPassageiros);
