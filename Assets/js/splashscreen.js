// Seleciona os elementos
let splash = document.querySelector('.splash');
let nextSlideOneButton = document.getElementById('next-slide-one');
let nextSlideTwoButton = document.getElementById('next-slide-two');
let screenpageOne = document.querySelector('.screenpage-one');
let screenpageTwo = document.querySelector('.screenpage-two');

// Quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
    // Animação da splash screen com fade-in e zoom-in
    gsap.fromTo(
        splash,
        { opacity: 0, scale: 0.8 }, // Começa com opacidade 0 e menor escala
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' } // Animação de fade-in e zoom-in
    );

    // Após 3 segundos, faz fade-out da splash screen
    setTimeout(() => {
        gsap.to(splash, {
            opacity: 0,
            scale: 0.9, // Pequeno zoom-out ao desaparecer
            duration: 0.5, // Transição mais rápida
            ease: 'power2.in',
            onComplete: () => {
                splash.style.display = 'none'; // Esconde a splash screen
                screenpageOne.style.display = 'flex'; // Mostra a primeira tela
                gsap.fromTo(
                    screenpageOne,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.2, ease: 'power2.out' } // Animação de fade-in mais rápida
                );
            }
        });
    }, 3000); // 3 segundos de exibição da splash screen
});

// Quando clica no botão da primeira tela
nextSlideOneButton.addEventListener('click', () => {
    gsap.to(screenpageOne, {
        opacity: 0,
        duration: 0.2, // Transição mais rápida
        ease: 'power2.in',
        onComplete: () => {
            screenpageOne.style.display = 'none'; // Esconde a primeira tela
            screenpageTwo.style.display = 'flex'; // Mostra a segunda tela
            gsap.fromTo(
                screenpageTwo,
                { opacity: 0 },
                { opacity: 1, duration: 0.2, ease: 'power2.out' } // Animação de fade-in mais rápida
            );
        }
    });
});

// Quando clica no botão da segunda tela
nextSlideTwoButton.addEventListener('click', () => {
    // Redireciona para a página de login
    window.location.href = './Assets/Pages/login.html';
});

