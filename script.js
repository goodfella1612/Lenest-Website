
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const cards = document.querySelectorAll('.carousel-card');
    let currentSlide = 0;
    const totalSlides = cards.length;

    function updateCarousel() {
        // Update track position
        const cardWidth = cards[0].offsetWidth + 20; // card width + gap
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Add click listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-slide functionality
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 4000); // Change slide every 4 seconds

    // Initialize carousel
    updateCarousel();
});
