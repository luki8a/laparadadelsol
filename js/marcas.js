// Slider infinito para marcas
document.addEventListener('DOMContentLoaded', function() {
    const sliderMarcas = document.querySelector('.slider-marcas');
    if (!sliderMarcas) return;
    
    // Duplicar las marcas para un efecto de scroll infinito más suave
    const marcas = document.querySelectorAll('.marca');
    marcas.forEach(marca => {
        const clon = marca.cloneNode(true);
        sliderMarcas.appendChild(clon);
    });
    
    let scrollAmount = 0;
    let isPaused = false;
    
    function moveSlider() {
        if (isPaused) return;
        
        // Velocidad reducida para mejor visualización de logos más grandes
        scrollAmount -= 0.5;
        if (Math.abs(scrollAmount) >= sliderMarcas.scrollWidth / 2) {
            scrollAmount = 0;
        }
        
        sliderMarcas.style.transform = `translateX(${scrollAmount}px)`;
    }
    
    // Pausar animación cuando se hace hover sobre una marca
    sliderMarcas.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    sliderMarcas.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    // Pausar también en dispositivos táctiles
    sliderMarcas.addEventListener('touchstart', () => {
        isPaused = true;
    }, {passive: true});
    
    sliderMarcas.addEventListener('touchend', () => {
        setTimeout(() => {
            isPaused = false;
        }, 1000);
    }, {passive: true});
    
    // Efectos de hover mejorados
    marcas.forEach(marca => {
        marca.addEventListener('mouseenter', () => {
            marca.style.zIndex = "10";
        });
        
        marca.addEventListener('mouseleave', () => {
            setTimeout(() => {
                marca.style.zIndex = "1";
            }, 300);
        });
    });
    
    // Iniciar animación
    setInterval(moveSlider, 16); // ~60fps para movimiento más suave
});