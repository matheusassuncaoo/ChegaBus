let splash = document.querySelector('.splash');
let nextSlideOneButton = document.getElementById('next-slide-one');
let nextSlideTwoButton = document.getElementById('next-slide-two');
let screenpageOne = document.querySelector('.screenpage-one');
let screenpageTwo = document.querySelector('.screenpage-two');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        screenpageTwo.classList.add('disabled');
    }, 500); 
    
    setTimeout(() => {
        screenpageTwo.classList.add('disabled');
        splash.classList.add('fade');
        setTimeout(() => {
            splash.style.display = 'none';
            screenpageOne.classList.add('active');
        }, 1000); 
    }, 3000); // 3000 milissegundos = 3 segundos
});

nextSlideOneButton.addEventListener('click', () => {
    screenpageOne.classList.add('fade-out');
    setTimeout(() => {
        screenpageOne.classList.remove('active', 'fade-out');
        screenpageOne.classList.add('disabled');
        screenpageTwo.classList.remove('disabled');
        screenpageTwo.classList.add('active', 'fade-in');
    }, 500); // Tempo para a transição de opacidade
});

nextSlideTwoButton.addEventListener('click', () => {
    screenpageTwo.classList.add('fade-out');
    setTimeout(() => {
        screenpageTwo.classList.remove('active', 'fade-out');
        screenpageTwo.classList.add('disabled');
        // Adicione aqui a lógica para a próxima tela, se houver
    }, 500); // Tempo para a transição de opacidade
});