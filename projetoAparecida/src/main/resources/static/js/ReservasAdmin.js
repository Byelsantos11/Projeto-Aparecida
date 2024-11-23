async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/reservas/BuscarReservas");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reservas = await response.json();
        const container = document.getElementById("geral-coordenador");

        reservas.forEach(reserva => {
            const card = document.createElement("div");
            card.className = "col-md-4 col-12";

            card.innerHTML = `
                <div class="card p-3">
                    <div class="info-descrição">
                        <p><strong>Nome:</strong> ${reserva.nome}</p>
                        <p><strong>Poltrona:</strong> ${reserva.poltrona}</p>
                        <p><strong>Valor:</strong> ${reserva.valor}</p>
                        <p><strong>Data:</strong> ${reserva.data_reserva}</p>
                        <p><strong>Ônibus:</strong> ${reserva.tipo_onibus}</p>
                    </div>
                    <div class="actions">
                        <span class="editar" data-id="${reserva.id}">✏️</span>
                        <span class="lixeira" data-id="${reserva.id}">🗑️</span>
                    </div>
                </div>
            `;

            container.appendChild(card);

         
            const deleteIcon = card.querySelector(".lixeira");
            deleteIcon.style.cursor = "pointer"; 
            deleteIcon.style.fontSize = "20px"; 

            deleteIcon.addEventListener("click", async (event) => {
                const reservaId = event.target.getAttribute("data-id");

                try {
                    const deleteResponse = await fetch(`http://localhost:8080/api/reservas/Deletar/${reservaId}`, {
                        method: "DELETE",
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(`Erro ao excluir reserva: ${deleteResponse.status}`);
                    }
                    card.remove();
                } catch (e) {
                    console.error("Erro ao excluir reserva:", e);
                }
            });


            const editIcon = card.querySelector(".editar");
            editIcon.style.cursor = "pointer"; 
            editIcon.style.fontSize = "20px"; 

            editIcon.addEventListener("click", () => {
                const reservaId = editIcon.getAttribute("data-id");

             
                openEditModal(reservaId, reserva);
            });
        });

    } catch (e) {
        console.error("Erro ao buscar dados:", e);
    }
}

document.addEventListener("DOMContentLoaded", requisition);


function openEditModal(reservaId, reserva) {
    const modal = document.getElementById("edit-modal");
    const nomeInput = modal.querySelector("#edit-nome");
    const poltronaInput = modal.querySelector("#edit-poltrona");
    const valorInput = modal.querySelector("#edit-valor");
    const dataInput = modal.querySelector("#edit-data");
	

 
    nomeInput.value = reserva.nome;
    poltronaInput.value = reserva.poltrona;
    valorInput.value = reserva.valor;
    dataInput.value = reserva.data_reserva;

    modal.style.display = "flex"; 

    const saveButton = modal.querySelector("#save-edit");
    const cancelButton = modal.querySelector("#cancel-edit");


    saveButton.onclick = async () => {
        const nome = nomeInput.value;
        const poltrona = poltronaInput.value;
        const valor = valorInput.value;
        const data_reserva = dataInput.value;

        try {
            const updateResponse = await fetch(`http://localhost:8080/api/reservas/Editar/${reservaId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    poltrona,
                    valor,
                    data_reserva
                })
            });

            if (!updateResponse.ok) {
                throw new Error(`Erro ao editar reserva: ${updateResponse.status}`);
            }

            const updatedReserva = await updateResponse.json();

         
            updateCard(reservaId, updatedReserva);

            modal.style.display = "none"; 
        } catch (e) {
            console.error("Erro ao editar reserva:", e);
        }
    };

 
    cancelButton.onclick = () => {
        modal.style.display = "none";
    };
}


function updateCard(reservaId, updatedReserva) {
    const card = document.querySelector(`.editar[data-id="${reservaId}"]`).closest(".card");
    card.querySelector(".info-descrição").innerHTML = `
        <p><strong>Nome:</strong> ${updatedReserva.nome}</p>
        <p><strong>Poltrona:</strong> ${updatedReserva.poltrona}</p>
        <p><strong>Valor:</strong> ${updatedReserva.valor}</p>
        <p><strong>Data:</strong> ${updatedReserva.data_reserva}</p>
        <p><strong>Ônibus:</strong> ${updatedReserva.tipo_onibus}</p>
    `;
}

