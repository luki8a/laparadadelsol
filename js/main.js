// Archivo principal de JavaScript
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio web de La Parada del Sol cargado correctamente');
    
    // Inicializar componentes si los módulos no están disponibles
    if (typeof initSlider !== 'function') {
        console.warn('Módulo slider.js no encontrado');
    }
    
    // Nota: La navegación ahora se maneja completamente en nav.js
    
    // Inicializar AOS para animaciones (si está disponible)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});