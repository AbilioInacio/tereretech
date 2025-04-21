document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children); // Pega todos os .carousel-item
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    if (!track || !nextButton || !prevButton || slides.length === 0) {
        console.error("Elementos do carrossel não encontrados!");
        return; // Impede a execução se algum elemento essencial faltar
    }

    // Pega a largura do container visível (carousel-slides)
    // Usaremos isso para saber quanto mover o track
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Organiza os slides lado a lado (embora o CSS já faça isso com flex)
    // Não é estritamente necessário com o CSS flex, mas pode ser útil
    // slides.forEach((slide, index) => {
    //     slide.style.left = slideWidth * index + 'px';
    // });
    // Com flex, o posicionamento é automático. Precisamos apenas mover o 'track'.

    let currentIndex = 0; // Começa no primeiro slide

    // Função para mover o track
    const moveToSlide = (targetIndex) => {
        // Calcula quanto mover (negativo para mover para a esquerda)
        const amountToMove = targetIndex * slideWidth;
        track.style.transform = `translateX(-${amountToMove}px)`;
        currentIndex = targetIndex;
    };

    // Event Listener para o botão "Próximo"
    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        // Se for o último slide, volta para o primeiro (loop)
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        moveToSlide(nextIndex);
    });

    // Event Listener para o botão "Anterior"
    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        // Se for o primeiro slide, vai para o último (loop)
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        moveToSlide(prevIndex);
    });

    // --- Opcional: Atualizar largura em caso de redimensionamento da janela ---
    window.addEventListener('resize', () => {
        // Recalcula a largura do slide
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        // Atualiza a posição do slide atual com a nova largura
        const amountToMove = currentIndex * newSlideWidth;
        // Remove a transição temporariamente para evitar pulos estranhos durante o resize
        track.style.transition = 'none';
        track.style.transform = `translateX(-${amountToMove}px)`;
        // Força o navegador a recalcular o layout antes de reativar a transição
        track.offsetHeight; // Truque para forçar reflow
        // Reativa a transição
        track.style.transition = 'transform 0.5s ease-in-out';

        // Atualiza a variável global slideWidth para os próximos cliques
        // Nota: Essa abordagem simples pode ter limitações. Bibliotecas de carrossel são mais robustas.
        // Para este exemplo simples, pode ser suficiente ou você pode omitir o listener de resize.
    });


    // Inicializa na posição correta (slide 0)
    moveToSlide(0);

});