document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault(); 

        let email = document.getElementById('email').value.trim();
        let senha = document.getElementById('senha').value.trim();

        let loginData = {
            email: email,
            senha: senha, 
        };

        let loginUrl;

    
        const tipoUsuario = document.getElementById('tipo') ? document.getElementById('tipo').value : 'passageiro'; 
     
        if (tipoUsuario === 'coordenador') {
            loginUrl = 'http://localhost:8080/api/coordenadores/loginCoord';
        } else {
            loginUrl = 'http://localhost:8080/api/passageiros/login';
        }

        try {
         
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                window.location.href = "/Home.html"; 
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Erro no login');
            }
        } catch (error) {
            alert(`Erro: ${error.message}`);
        }
    });

 
    document.getElementById('login-eye').addEventListener('click', function () {
        const passwordInput = document.getElementById('senha');
        const eyeIcon = this;
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.remove('ri-eye-off-line');
            eyeIcon.classList.add('ri-eye-line');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('ri-eye-line');
            eyeIcon.classList.add('ri-eye-off-line');
        }
    });
});
