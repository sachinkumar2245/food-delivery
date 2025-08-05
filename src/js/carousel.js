/* ================================
   CAROUSEL.JS
   Purpose: Auto-slide carousel functionality
   Usage: Import and call setupCarousel()
   ================================ */

export function setupCarousel() {
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  
  if (!carouselContainer || slides.length === 0) {
    console.warn("⚠️ Carousel not initialized: No slides found.");
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideWidth = slides[0].clientWidth;
  const slideInterval = 4000; // Time between slides (ms)

  // Set container width dynamically
  carouselContainer.style.width = `${totalSlides * 100}%`;
  slides.forEach(slide => slide.style.width = `${100 / totalSlides}%`);

  // Auto-slide function
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    carouselContainer.style.transition = "transform 0.6s ease-in-out";
  }

  // Start auto-sliding
  setInterval(nextSlide, slideInterval);

  // Optional: Pause on hover
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideTimer);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  });
}
