async function carregarDados(endpoint, elementoLista) {
    const lista = document.getElementById(elementoLista);
    const carregandoMensagem = document.getElementById('carregando-mensagem');
    const erroMensagem = document.getElementById('erro-mensagem');
    
    carregandoMensagem.style.display = 'block';
    erroMensagem.style.display = 'none';

    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}`);
        if (!response.ok) throw new Error(`Erro ao carregar dados de ${endpoint}`);

        const dados = await response.json();
        lista.innerHTML = ''; 

        
        if (dados.length === 0) {
            lista.innerHTML = '<tr><td colspan="100%">Nenhum item encontrado.</td></tr>';
            return;
        }

        dados.forEach(item => {
            const tr = document.createElement('tr');
            const colunas = Object.values(item).map(valor => `<td>${escapeHTML(valor)}</td>`).join('');
            const acoes = `
                <td>
                    <button class="edit-btn" aria-label="Editar item" onclick="editarItem('${endpoint}', ${item.id})">Editar</button>
                    <button class="delete-btn" aria-label="Excluir item" onclick="excluirItem('${endpoint}', ${item.id}, this)">Excluir</button>
                </td>
            `;
            tr.innerHTML = colunas + acoes;
            lista.appendChild(tr);
        });
    } catch (error) {
        console.error(`Erro ao carregar ${endpoint}:`, error);
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

async function excluirItem(endpoint, id, botaoExcluir) {
    const confirmacao = confirm('Tem certeza que deseja excluir este item?');
    if (!confirmacao) return;

    try {
        const response = await fetch(`http://localhost:3000/api/${endpoint}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao excluir item');

        alert('Item excluído com sucesso!');
       
        botaoExcluir.closest('tr').remove();
    } catch (error) {
        console.error(`Erro ao excluir ${endpoint}:`, error);
        alert('Ocorreu um erro ao tentar excluir o item.');
    }
}

function editarItem(endpoint, id) {
    alert(`Função de edição para o ID ${id} em ${endpoint} ainda não implementada.`);
    
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDados('coordenadores', 'coordenadores-tabela-corpo');
    carregarDados('pagamentos', 'pagamentos-tabela-corpo');
    carregarDados('passageiros', 'passageiros-tabela-corpo');
    carregarDados('onibus', 'onibus-tabela-corpo');
});
