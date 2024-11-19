document.addEventListener('DOMContentLoaded', function () {
    /**
     * Valida os campos obrigatórios do formulário de endereço.
     * @returns {boolean} Retorna true se todos os campos obrigatórios estiverem preenchidos, caso contrário, false.
     */
    function validateAddressForm() {
        const cep = document.getElementById('cep').value.trim();
        const street = document.getElementById('street').value.trim();
        const number = document.getElementById('number').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();

        if (!cep || !street || !number || !city || !state) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return false;
        }
        return true;
    }

    /**
     * Realiza a busca de um endereço pelo CEP utilizando a API ViaCEP.
     */
    async function buscarCep() {
        const cepInput = document.getElementById('cep').value.trim();
        if (!cepInput) {
            alert('Por favor, insira o CEP para buscar o endereço.');
            return;
        }

        const cep = cepInput.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length !== 8) {
            alert('CEP inválido. Verifique e tente novamente.');
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP.');
            }

            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado. Verifique e tente novamente.');
                return;
            }

            // Preenche os campos do formulário com os dados retornados pela API
            document.getElementById('street').value = data.logradouro || '';
            document.getElementById('city').value = data.localidade || '';
            document.getElementById('state').value = data.uf || '';

        } catch (error) {
            console.error('Erro ao buscar o CEP:', error);
            alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
        }
    }

    // Event listener para o botão de buscar CEP
    document.getElementById('buscar-cep').addEventListener('click', buscarCep);

    // Event listener para o formulário de endereço
    document.getElementById('address-form').addEventListener('submit', function (event) {
        event.preventDefault();

        if (validateAddressForm()) {
            alert('Redirecionando para a tela de pagamento...');
            window.location.href = 'telapagamento.html';
        }
    });

    // Event listener para o botão de voltar ao carrinho
    document.getElementById('continue-shopping').addEventListener('click', function () {
        alert('Redirecionando para o carrinho...');
        window.location.href = 'telacarrinho.html';
    });
});
