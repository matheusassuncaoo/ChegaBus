// Seleciona os elementos
const botaoAlternarSenha = document.getElementById('togglePassword');
const campoSenha = document.getElementById('password');
const botaoLoginGoogle = document.querySelector('.loginButton');
const botaoLogin = document.querySelector('.btn-primary'); // Botão "Entrar"
const formularioLogin = document.querySelector('.fakeLoginForm');

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os Feather Icons
    feather.replace();

    // Alterna a visibilidade da senha e atualiza o ícone
    botaoAlternarSenha.addEventListener('click', function() {
        if (campoSenha.type === 'password') {
            campoSenha.type = 'text';
            this.innerHTML = '<i data-feather="eye"></i>';
        } else {
            campoSenha.type = 'password';
            this.innerHTML = '<i data-feather="eye-off"></i>';
        }
        // Reexecuta o feather.replace para atualizar os ícones
        feather.replace();
    });
});

// Simula o login com o Google
botaoLoginGoogle.addEventListener('click', () => {
    alert('Redirecionando para login com o Google...');
    window.location.href = 'https://accounts.google.com/signin';
});

// Animação ao clicar no botão "Entrar"
botaoLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o envio do formulário
    gsap.to(formularioLogin, {
        opacity: 0,
        y: -50, // Move o formulário para cima
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
            alert('Login bem-sucedido! Redirecionando para o dashboard...');
            window.location.href = './dashboard.html'; 
        }
    });
});