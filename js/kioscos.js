// kioscos.js
export function initKioscos() {
    const kioscoCards = document.querySelectorAll('.kiosco-card');

    function animateCards() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });

            kioscoCards.forEach(card => observer.observe(card));
        } else {
            kioscoCards.forEach(card => card.classList.add('visible'));
        }
    }

    animateCards();

    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transition = 'all 0.3s ease';
            feature.style.transform = 'scale(1.05)';
            feature.style.backgroundColor = 'rgba(153, 204, 0, 0.2)';
        });
        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'scale(1)';
            feature.style.backgroundColor = 'rgba(153, 204, 0, 0.1)';
        });
    });
}
