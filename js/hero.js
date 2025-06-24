document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dotsContainer = document.querySelector('.hero-slider .slider-dots');
  const prevBtn = document.querySelector('.hero-slider .slider-arrow.prev');
  const nextBtn = document.querySelector('.hero-slider .slider-arrow.next');
  let current = 0;
  let interval;
  let startX = 0, endX = 0;

  // Crear dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', () => goToSlide(i));
  });
  const dots = dotsContainer.querySelectorAll('button');

  function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetInterval();
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }
  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Swipe táctil
  const wrapper = document.querySelector('.hero-slider .slider-wrapper');
  wrapper.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  wrapper.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
  });
  wrapper.addEventListener('touchend', () => {
    if (startX && endX) {
      if (startX - endX > 50) nextSlide();
      else if (endX - startX > 50) prevSlide();
    }
    startX = endX = 0;
  });

  resetInterval();
});