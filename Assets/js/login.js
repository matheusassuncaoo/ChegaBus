// Seleciona os elementos
const botaoAlternarSenha = document.getElementById('togglePassword');
const campoSenha = document.getElementById('password');
const botaoLoginGoogle = document.querySelector('.loginButton');
const botaoLogin = document.querySelector('.btn-primary'); // Botão "Entrar"
const formularioLogin = document.querySelector('.fakeLoginForm');

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    feather.replace();

    // Alterna a visibilidade da senha
    botaoAlternarSenha.addEventListener('click', () => {
        const senhaVisivel = campoSenha.getAttribute('type') === 'password';
        campoSenha.setAttribute('type', senhaVisivel ? 'text' : 'password');
        
        // Atualiza o ícone do botão usando Feather Icons
        const icone = botaoAlternarSenha.querySelector('i');
        if (senhaVisivel) {
            feather.replace(icone, { class: 'feather-eye' });
        } else {
            feather.replace(icone, { class: 'feather-eye-slash' });
        }
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
            window.location.href = './dashboard.html'; // Substitua pelo caminho real do dashboard
        }
    });
});