async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/passageiros/BuscarPassageiros");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const passageiros = await response.json();

        
        const container = document.getElementById("geral-coordenador");

        passageiros.forEach(passageiros => {
          
            const card = document.createElement("div");
            card.className = "col-md-4 col-12";

            card.innerHTML = `
                <div class="card p-3">
                    <div class="info-descrição">
                        <p><strong>Nome:</strong> ${passageiros.nome}</p>
                        <p><strong>Email:</strong> ${passageiros.email}</p>
                        <p><strong>Contato:</strong> ${passageiros.telefone}</p>
						<p><strong>Documento:</strong> ${passageiros.cpf}</p>
                    </div>
                </div>
            `;

            container.appendChild(card); 
        });

    } catch (e) {
        console.error("Erro ao buscar dados:", e);
    }
}



document.addEventListener("DOMContentLoaded",  requisition);