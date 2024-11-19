
document.getElementById('cpf-cnpj').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    if (value.length <= 11) {
        this.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
        this.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
});

document.getElementById('phone').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    this.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
});

document.getElementById('cep').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '');
    this.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
});


document.getElementById('confirm-payment').addEventListener('click', function (event) {
    event.preventDefault();

    const requiredFields = document.querySelectorAll('input[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
        const errorMsg = field.nextElementSibling;
        if (!field.value.trim()) {
            errorMsg.textContent = 'Este campo é obrigatório.';
            errorMsg.style.display = 'block';
            isValid = false;
        } else {
            errorMsg.style.display = 'none';
        }
    });

    if (isValid) {
        alert('Pagamento confirmado! Obrigado pela sua compra.');
    }
});
