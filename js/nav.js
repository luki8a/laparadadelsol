// Para lograr el efecto de navegación en scroll
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos relevantes
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Variables para controlar el comportamiento del scroll
    let lastScrollTop = 0;
    let scrollTimer;
    
    // Manejar el evento scroll para cambiar estilos del navbar y ocultarlo/mostrarlo
    window.addEventListener('scroll', function() {
        // Efecto de scrolled para cambiar apariencia
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Lógica para ocultar/mostrar navbar según dirección del scroll
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // No ejecutamos la lógica de ocultar si estamos en la parte superior de la página
        if (currentScrollTop <= 50) {
            navbar.classList.remove('hidden');
            lastScrollTop = currentScrollTop;
            return;
        }
        
        // Determinar dirección del scroll
        if (currentScrollTop > lastScrollTop) {
            // Scroll hacia abajo - ocultar navbar
            navbar.classList.add('hidden');
        } else {
            // Scroll hacia arriba - mostrar navbar
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = currentScrollTop;
        
        // Limpiar y establecer temporizador para mostrar navbar después de detenerse
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            navbar.classList.remove('hidden'); // Mostrar navbar cuando el usuario deja de hacer scroll
        }, 1500); // Mostrar después de 1.5 segundos sin scroll
    });    // Navegación móvil toggle con animación mejorada y suave
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Alternar clases con un ligero retraso para mejorar la animación
            if (!navMenu.classList.contains('active')) {
                // Abrir menú
                navToggle.classList.add('active');
                navbar.classList.add('menu-active'); // Activar el overlay primero
                
                // Pequeño retraso para que el overlay aparezca primero
                setTimeout(() => {
                    navMenu.classList.add('active');
                }, 50);
                
                document.body.style.overflow = 'hidden'; // Bloquear scroll
            } else {
                // Cerrar menú - primero quitar 'active' del menú, luego el resto
                navMenu.classList.remove('active');
                
                // Esperar a que termine la transición del menú antes de quitar el overlay
                setTimeout(() => {
                    navToggle.classList.remove('active');
                    navbar.classList.remove('menu-active');
                    document.body.style.overflow = ''; // Restaurar scroll
                }, 350); // Tiempo similar a la duración de la transición CSS
            }
        });
        
        // Cerrar menú al hacer clic en un enlace - con transición suave
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                
                // Esperar a que termine la transición antes de quitar el overlay
                setTimeout(() => {
                    navToggle.classList.remove('active');
                    navbar.classList.remove('menu-active');
                    document.body.style.overflow = '';
                }, 350);
            });
        });
        
        // Cerrar menú también al hacer clic en el overlay
        document.addEventListener('click', function(e) {
            if (navbar.classList.contains('menu-active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navbar.classList.remove('menu-active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Actualizar link activo basado en la sección visible
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});