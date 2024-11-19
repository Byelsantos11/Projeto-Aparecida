// Função para buscar o endereço via API do ViaCEP
document.getElementById("cep").addEventListener("blur", buscarEndereco);

async function buscarEndereco() {
  const cep = document.getElementById("cep").value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  if (cep.length === 8 && /^[0-9]+$/.test(cep)) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.erro) {
        mostrarMensagem("CEP não encontrado!", "error");
      } else {
        document.getElementById("logradouro").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("estado").value = data.uf || "";
        mostrarMensagem("Endereço preenchido com sucesso!", "success");
      }
    } catch (error) {
      mostrarMensagem("Erro ao buscar o endereço!", "error");
    }
  } else {
    mostrarMensagem("CEP inválido! Verifique o formato.", "error");
  }
}

// Função para validar todos os campos ao enviar o formulário
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const inputs = document.querySelectorAll("input");
  let formValido = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      formValido = false;
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "#fbc02d";
    }
  });

  if (formValido) {
    mostrarMensagem("Cadastro realizado com sucesso!", "success");
    // Aqui você pode enviar os dados para o servidor com AJAX ou outra técnica
  } else {
    mostrarMensagem("Preencha todos os campos obrigatórios!", "error");
  }
});

// Função para exibir mensagens dinâmicas no topo do formulário
function mostrarMensagem(mensagem, tipo) {
  const mensagemBox = document.createElement("div");
  mensagemBox.className = `mensagem ${tipo}`;
  mensagemBox.textContent = mensagem;

  document.querySelector(".form-card").prepend(mensagemBox);

  setTimeout(() => mensagemBox.remove(), 3000);
}
