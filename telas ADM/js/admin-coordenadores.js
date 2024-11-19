async function carregarCoordenadores() {
    const tabelaCorpo = document.getElementById('coordenadores-tabela-corpo');
    const carregandoMensagem = document.getElementById('carregando-mensagem');
    const erroMensagem = document.getElementById('erro-mensagem');

   
    carregandoMensagem.style.display = 'block';
    erroMensagem.style.display = 'none';

    try {
       
        const response = await fetch('http://localhost:3000/api/coordenadores');
        if (!response.ok) throw new Error('Erro ao carregar coordenadores');


        const coordenadores = await response.json();
        tabelaCorpo.innerHTML = ''; 

     
        coordenadores.forEach(coordenador => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(coordenador.id)}</td>
                <td>${escapeHTML(coordenador.nome)}</td>
                <td>${escapeHTML(coordenador.email)}</td>
                <td>
                    <button class="edit-btn" aria-label="Editar coordenador" onclick="editarCoordenador(${coordenador.id})">Editar</button>
                    <button class="delete-btn" aria-label="Excluir coordenador" onclick="excluirCoordenador(${coordenador.id})">Excluir</button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar coordenadores:', error);
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

function editarCoordenador(id) {
    alert(`Editar coordenador com ID: ${id}`);
   
}

async function excluirCoordenador(id) {
    const confirmacao = confirm('Tem certeza que deseja excluir este coordenador?');
    if (!confirmacao) return;

    try {
   
        const response = await fetch(`http://localhost:3000/api/coordenadores/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao excluir coordenador');

        alert('Coordenador excluído com sucesso!');
        carregarCoordenadores(); 
    } catch (error) {
        console.error('Erro ao excluir coordenador:', error);
    }
}


document.addEventListener('DOMContentLoaded', carregarCoordenadores);
