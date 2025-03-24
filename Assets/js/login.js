// Seleciona os elementos
const botaoAlternarSenha = document.getElementById('togglePassword');
const campoSenha = document.getElementById('password');
const botaoLoginGoogle = document.querySelector('.loginButton');
const botaoLogin = document.querySelector('.btn-primary'); // Botão "Entrar"
const formularioLogin = document.querySelector('.fakeLoginForm');

// Alterna a visibilidade da senha
botaoAlternarSenha.addEventListener('click', () => {
    const senhaVisivel = campoSenha.getAttribute('type') === 'password';
    campoSenha.setAttribute('type', senhaVisivel ? 'text' : 'password');
    // Alterna o ícone do botão
    const icone = botaoAlternarSenha.querySelector('i');
    icone.classList.toggle('bi-eye');
    icone.classList.toggle('bi-eye-slash');
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