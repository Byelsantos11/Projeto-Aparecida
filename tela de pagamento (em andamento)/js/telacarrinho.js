document.addEventListener("DOMContentLoaded", function () {
    function atualizarTotal(carrinho) {
        const totalElement = document.querySelector('.total strong');
        let total = 0;

        carrinho.forEach(item => {
            total += item.quantidade * item.preco;
        });

        if (document.getElementById('add-insurance').checked) {
            total += 20;
        }

        totalElement.textContent = `Total Final: R$ ${total.toFixed(2)}`;
    }

    function carregarCarrinho() {
        fetch('/api/carrinho')
            .then(response => response.json())
            .then(data => {
                const carrinho = data.itens;
                const orderSummary = document.querySelector('#order-summary');

                if (carrinho.length > 0) {
                    orderSummary.innerHTML = '';

                    carrinho.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = `${item.nome} - ${item.quantidade}x - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
                        orderSummary.appendChild(li);
                    });

                    atualizarTotal(carrinho);
                } else {
                    orderSummary.innerHTML = '<li>Carrinho vazio</li>';
                    document.querySelector('.total strong').textContent = 'Total Final: R$ 0,00';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o carrinho:', error);
            });
    }

    carregarCarrinho();

    document.getElementById('add-insurance').addEventListener('change', function () {
        const carrinho = document.querySelectorAll('#order-summary li');
        atualizarTotal(carrinho);
    });
    

    document.getElementById('cart-form').addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Redirecionando para a tela de endereço...');
        window.location.href = 'telaendereco.html';
    });

    document.getElementById('continue-shopping').addEventListener('click', function () {
        alert('Redirecionando para a loja...');
        window.location.href = 'index.html';
    });
});
