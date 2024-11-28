document.getElementById("payment-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        // Coleta os valores dos campos do formulário
        const nome = document.getElementById("card_nome").value;
        const cpf = document.getElementById("card_cpf").value;
        const email = document.getElementById("card_email").value;
        const telefone = document.getElementById("card_telefone").value;
        const poltronas = document.getElementById("card_poltrona").value;
        const tipoPagamento = document.getElementById("card_tipo_pagamento").value;

        const pagamento = {
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            poltrona: poltronas,
            tipo_pagamento: tipoPagamento
        };

        const response = await fetch("http://localhost:8080/api/pagamento/criarPagamento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pagamento)
        });

        
        const textResponse = await response.text(); 
        console.log("Resposta do servidor:", textResponse);

        if (response.ok) {
            try {
                const result = JSON.parse(textResponse);  
                lembreteSucesso()
                document.getElementById("payment-form").reset();
            } catch (e) {
                console.error("Erro ao parsear JSON:", e);
                alert("Erro ao processar a resposta do servidor.");
            }
        } else {
            alert("Erro ao criar o pagamento. Tente novamente.");
        }

    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Erro ao processar o pagamento. Por favor, tente novamente.");
    }
});


function lembreteSucesso() {
    const alertaSucesso = document.querySelector("#alertaSucesso");
    alertaSucesso.style.display = "block";
    setTimeout(() => {
        alertaSucesso.style.display = "none";
		window.location.href="/Home.html"
    }, 3000);
}

