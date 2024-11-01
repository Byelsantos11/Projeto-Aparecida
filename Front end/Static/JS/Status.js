const confirmarReservaBtn = document.getElementById("confirmar-reserva-btn");
const cancelarBtn = document.getElementById("cancelar-btn");
const modalCancelamento = document.getElementById("modal-cancelamento");
const closeModal = document.getElementById("close-modal");
const confirmarCancelamento = document.getElementById("confirmar-cancelamento");
const cancelarCancelamento = document.getElementById("cancelar-cancelamento");

// Função para exibir uma mensagem de confirmação para reserva
confirmarReservaBtn.addEventListener("click", () => {
    alert("Reserva confirmada! Você será redirecionado para a tela de pagamento.");
    // Futuramente, redirecionará o usuário para a tela de pagamento
});

// Função para abrir o modal de cancelamento
cancelarBtn.addEventListener("click", () => {
    modalCancelamento.style.display = "block";
});

// Função para fechar o modal de cancelamento
closeModal.addEventListener("click", () => {
    modalCancelamento.style.display = "none";
});

// Confirma o cancelamento da reserva
confirmarCancelamento.addEventListener("click", () => {
    alert("Sua reserva foi cancelada.");
    modalCancelamento.style.display = "none";
});

// Cancela a ação de cancelamento e fecha o modal
cancelarCancelamento.addEventListener("click", () => {
    modalCancelamento.style.display = "none";
});

// Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target == modalCancelamento) {
        modalCancelamento.style.display = "none";
    }
};
