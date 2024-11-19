async function carregarPagamentos() {
    const tabelaCorpo = document.getElementById('pagamentos-tabela-corpo');
    const carregandoMensagem = document.getElementById('carregando-mensagem');
    const erroMensagem = document.getElementById('erro-mensagem');

   
    carregandoMensagem.style.display = 'block';
    erroMensagem.style.display = 'none';

    try {
     
        const response = await fetch('http://localhost:3000/api/pagamentos');
        if (!response.ok) throw new Error('Erro ao carregar pagamentos');

        
        const pagamentos = await response.json();
        tabelaCorpo.innerHTML = '';

       
        pagamentos.forEach(pagamento => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHTML(pagamento.id)}</td>
                <td>${escapeHTML(pagamento.nome_passageiro)}</td>
                <td>${escapeHTML(pagamento.valor_pago)}</td>
                <td>${escapeHTML(pagamento.data)}</td>
                <td><button class="view-btn" aria-label="Visualizar pagamento" onclick="visualizarPagamento(${pagamento.id})">Visualizar</button></td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar pagamentos:', error);
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

function visualizarPagamento(id) {
    alert(`Visualizar pagamento com ID: ${id}`);

}


document.addEventListener('DOMContentLoaded', carregarPagamentos);
