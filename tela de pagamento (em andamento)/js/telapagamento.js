document.addEventListener('DOMContentLoaded', function () {
    const loadOrderSummary = async () => {
        try {
            const response = await fetch('/api/pedido');
            const data = await response.json();

            const orderSummary = document.getElementById('order-summary');
            const totalPrice = document.getElementById('total-price');

            orderSummary.innerHTML = '';

            data.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - ${item.quantity}x - R$ ${item.price.toFixed(2)}`;
                orderSummary.appendChild(listItem);
            });

            totalPrice.innerHTML = `<strong>Total Final: R$ ${data.total.toFixed(2)}</strong>`;
        } catch (error) {
            console.error('Erro ao carregar os dados do pedido:', error);
            alert('Não foi possível carregar o resumo do pedido. Tente novamente mais tarde.');
        }
    };

    const validatePaymentForm = () => {
        const cardName = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        const cardNumberRegex = /\d{4} \d{4} \d{4} \d{4}/;
        const expiryDateRegex = /\d{2}\/\d{2}/;
        const cvvRegex = /\d{3,4}/;

        if (!cardName || !cardNumber || !expiryDate || !cvv) {
            alert("Por favor, preencha todos os campos de pagamento.");
            return false;
        }

        if (!cardNumberRegex.test(cardNumber)) {
            alert("O número do cartão está no formato incorreto.");
            return false;
        }

        if (!expiryDateRegex.test(expiryDate)) {
            alert("A data de validade está no formato incorreto (MM/AA).");
            return false;
        }

        if (!cvvRegex.test(cvv)) {
            alert("O código CVV deve ter 3 ou 4 dígitos.");
            return false;
        }

        return true;
    };

    const handlePayment = async (event) => {
        event.preventDefault();

        
        if (!validatePaymentForm()) return;

        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.classList.remove('hidden');

        const paymentData = {
            cardName: document.getElementById('card-name').value,
            cardNumber: document.getElementById('card-number').value,
            expiryDate: document.getElementById('expiry-date').value,
            cvv: document.getElementById('cvv').value,
            saveCard: document.getElementById('save-card').checked,
            termsAccepted: document.getElementById('terms').checked
        };

        try {
            const response = await fetch('/api/pagar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = '/confirmacao';
            } else {
                alert('Erro no pagamento. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao processar o pagamento:', error);
            alert('Erro ao processar o pagamento. Tente novamente.');
        } finally {
            loadingSpinner.classList.add('hidden');
        }
    };

    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handlePayment);

    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.location.href = 'telaendereco.html';
        });
    } else {
        console.error('Botão "Voltar" não encontrado.');
    }

    loadOrderSummary();
});
