async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/pagamento/listarTodos");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const pagamentos = await response.json();
        const container = document.getElementById("geral-pagamentos");

        pagamentos.forEach(pagamento => {
            const card = document.createElement("div");
            card.className = "col-md-4 col-12";

            card.innerHTML = `
                <div class="card p-3">
                    <div class="info-descrição">
                        <p><strong>Nome:</strong> ${pagamento.nome}</p>
                        <p><strong>CPF:</strong> ${pagamento.cpf}</p>
                        <p><strong>Email:</strong> ${pagamento.email}</p>
                        <p><strong>Telefone:</strong> ${pagamento.telefone}</p>
                        <p><strong>Forma de pagamento:</strong> ${pagamento.tipo_pagamento}</p>
						<p><strong>Status:</strong> ${pagamento.status_pagamento}</p>
                    </div>
                    <div class="actions">
                        <span class="editar" data-id="${pagamento.id}" data-status="${pagamento.status_pagamento}">✏️</span>
                        <span class="lixeira" data-id="${pagamento.id}">🗑️</span>
                    </div>
                </div>
            `;

            container.appendChild(card);

            // Botão de excluir
            const deleteIcon = card.querySelector(".lixeira");
            deleteIcon.style.cursor = "pointer"; 
            deleteIcon.style.fontSize = "20px";

            deleteIcon.addEventListener("click", async (event) => {
                const pagamentoId = event.target.getAttribute("data-id");

                try {
                    const deleteResponse = await fetch(`http://localhost:8080/api/pagamento/Deletar/${pagamentoId}`, {
                        method: "DELETE",
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(`Erro ao excluir pagamento: ${deleteResponse.status}`);
                    }

                    card.remove();
                    lembreteSucesso("Pagamento excluído com sucesso!");
                } catch (e) {
                    console.error("Erro ao excluir pagamento:", e);
                }
            });

            // Botão de editar
            const editIcon = card.querySelector(".editar");
            editIcon.style.cursor = "pointer"; 
            editIcon.style.fontSize = "20px";

            editIcon.addEventListener("click", () => {
                const pagamentoId = editIcon.getAttribute("data-id");
                const statusAtual = editIcon.getAttribute("data-status");

                openEditModal(pagamentoId, statusAtual);
            });
        });
    } catch (e) {
        console.error("Erro ao buscar dados:", e);
    }
}

document.addEventListener("DOMContentLoaded", requisition);

function openEditModal(pagamentoId, statusAtual) {
    const modal = document.getElementById("edit-modal");
    const statusInput = modal.querySelector("#edit-status");

 
    statusInput.value = statusAtual;

    modal.style.display = "flex";

    const saveButton = modal.querySelector("#save-edit");
	const cancelButton = modal.querySelector("#cancel-edit");

    saveButton.onclick = async () => {
        const novoStatus = statusInput.value;

        try {
            const updateResponse = await fetch(`http://localhost:8080/api/pagamento/Editar/${pagamentoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(novoStatus)
            });

            if (!updateResponse.ok) {
                throw new Error(`Erro ao editar pagamento: ${updateResponse.status}`);
            }

            
            updateCard(pagamentoId, novoStatus);

            modal.style.display = "none";
            lembreteSucesso("Pagamento atualizado com sucesso!");
        } catch (e) {
            console.error("Erro ao editar pagamento:", e);
        }
    };

    cancelButton.onclick = () => {
        modal.style.display = "none";
    };
}

function updateCard(pagamentoId, novoStatus) {
    const card = document.querySelector(`.editar[data-id="${pagamentoId}"]`).closest(".card");
    card.querySelector(".info-descrição p:nth-child(5)").innerHTML = `<strong>Status:</strong> ${novoStatus}`;
}

function lembreteSucesso(mensagem) {
    const alertaSucesso = document.querySelector("#alertaSucesso");
    alertaSucesso.innerText = mensagem;
    alertaSucesso.style.display = "block";
    setTimeout(() => {
        alertaSucesso.style.display = "none";
    }, 2000);
}
