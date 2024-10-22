   // Função para alternar visibilidade da senha
   document.getElementById('login-eye').addEventListener('click', function () {
    const passwordInput = document.getElementById('login-pass');
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