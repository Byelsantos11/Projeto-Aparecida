async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/coordenadores/BuscarCoordenadores");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const coordenadores = await response.json();

        const container = document.getElementById("geral-coordenador");

        coordenadores.forEach(coordenador => {

            const card = document.createElement("div");
            card.className = "col-md-4 col-12";

            card.innerHTML = `
                <div class="card p-3">
                    <div class="info-descrição">
                        <p><strong>Nome:</strong> ${coordenador.nome}</p>
                        <p><strong>Email:</strong> ${coordenador.email}</p>
                        <p><strong>Telefone:</strong> ${coordenador.telefone}</p>
                    </div>
                    <!-- Lixeira como um ícone simples -->
                    <span class="lixeira" data-id="${coordenador.id}">🗑️</span>
                </div>
            `;

            container.appendChild(card);

            const deleteIcon = card.querySelector(".lixeira");
            deleteIcon.style.cursor = "pointer"; 
            deleteIcon.style.fontSize = "20px"; 
       
			

            deleteIcon.addEventListener("click", async (event) => {
                const CoordenadorId = event.target.getAttribute("data-id");

                try {
                    const deleteResponse = await fetch(`http://localhost:8080/api/coordenadores/Deletar/${CoordenadorId}`, {
                        method: "DELETE",
                    });

                    if (!deleteResponse.ok) {
                        throw new Error(`Erro ao excluir reserva: ${deleteResponse.status}`);
                    }
                    card.remove();
					lembreteSucesso()
                } catch (e) {
                    console.error("Erro ao excluir reserva:", e);
                }
            });
        });

    } catch (e) {
        console.error("Erro ao buscar dados:", e);
    }
}


function lembreteSucesso() {
    const alertaSucesso = document.querySelector("#alertaSucesso");
    alertaSucesso.style.display = "block";
    setTimeout(() => {
        alertaSucesso.style.display = "none";
    }, 2000);
}


document.addEventListener("DOMContentLoaded", requisition);



