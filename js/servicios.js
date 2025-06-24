// servicios.js
export function initServicios() {
    const servicioCards = document.querySelectorAll('.servicio-card');
    const pagoItems = document.querySelectorAll('.pago-item');

    function animateElementsSequentially(elements, delayBetween = 150) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * delayBetween);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(element);
            });
        }
    }

    animateElementsSequentially(servicioCards);
    animateElementsSequentially(pagoItems, 100);

    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            .servicio-card.visible {
                animation: subtle-pulse 4s ease-in-out infinite;
                animation-delay: 1s;
            }
            .servicio-card.visible:hover {
                animation-play-state: paused;
            }
            @keyframes subtle-pulse {
                0% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); }
                50% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); }
                100% { box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); }
            }
        </style>
    `);

    pagoItems.forEach(item => {
        const icon = item.querySelector('.pago-icon');
        item.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
}
