async function requisition() {
    try {
        const response = await fetch("http://localhost:8080/api/onibus/BuscarOnibus");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const onibus = await response.json();

        
        const container = document.getElementById("geral-coordenador");

        onibus.forEach(onibus => {
          
            const card = document.createElement("div");
            card.className = "col-md-4 col-12";

            card.innerHTML = `
                <div class="card p-3">
                    <div class="info-descrição">
                        <p><strong>Nome:</strong> ${onibus.modelo}</p>
                        <p><strong>Capacidade:</strong> ${onibus.capacidade}</p>
                        <p><strong>Tipo Ônibus:</strong> ${onibus.tipo_onibus}</p>
						<p><strong>Coordenador Responsável:</strong> ${onibus.coordenador.nome}</p>
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