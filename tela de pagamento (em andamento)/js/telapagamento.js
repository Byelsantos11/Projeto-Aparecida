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
        }
    };

    const handlePayment = async (event) => {
        event.preventDefault();

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

    loadOrderSummary();

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
});
