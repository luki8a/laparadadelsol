// slider.js
export function initSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    let startX, endX, isDragging = false, threshold = 100, dragOffset = 0;
    let currentSlide = 0, slideInterval;
    let autoPlayEnabled = true;

    function ensureCentered(slideElement) {
        if (!slideElement) return;
        slideElement.style.display = 'flex';
        slideElement.style.justifyContent = 'center';
        slideElement.style.alignItems = 'center';
        const slideContent = slideElement.querySelector('.slide-content');
        if (slideContent) {
            slideContent.style.margin = '0 auto';
            slideContent.style.maxWidth = '1200px';
            slideContent.style.width = '100%';
        }
    }

    function showSlide(index, direction = null) {
        slides.forEach(slide => {
            slide.classList.remove('active', 'slide-left', 'slide-right');
            slide.style.removeProperty('transform');
        });
        indicators.forEach(i => i.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        const slideToShow = slides[currentSlide];
        ensureCentered(slideToShow);
        if (direction) slideToShow.classList.add(`slide-${direction}`);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                slideToShow.classList.add('active');
                indicators[currentSlide].classList.add('active');
            });
        });
    }

    function prevSlide() { showSlide(currentSlide - 1, 'left'); }
    function nextSlide() { showSlide(currentSlide + 1, 'right'); }

    function startSlideInterval() {
        if (autoPlayEnabled) slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    sliderContainer.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        dragOffset = 0;
        autoPlayEnabled = false;
        clearInterval(slideInterval);
        ensureCentered(document.querySelector('.slide.active'));
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', e => {
        if (!startX) return;
        endX = e.touches[0].clientX;
        dragOffset = endX - startX;
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide && Math.abs(dragOffset) > 20)
            activeSlide.style.transform = `translateX(${dragOffset * 0.3}px)`;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', () => {
        const diffX = startX - endX;
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide) activeSlide.style.transform = '';
        if (Math.abs(diffX) > threshold) diffX > 0 ? nextSlide() : prevSlide();
        startX = endX = dragOffset = null;
    }, { passive: true });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetSlideInterval();
        });
    });

    showSlide(0);
    startSlideInterval();
}
