
document.addEventListener('DOMContentLoaded', function() {
    // === HAMBURGER MENU ===
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    const headerRight = document.getElementById('headerRight');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Show/hide header right for mobile
            if (headerRight) {
                if (mainNav.classList.contains('active')) {
                    headerRight.classList.add('mobile-show');
                } else {
                    headerRight.classList.remove('mobile-show');
                }
            }
        });

        // Handle dropdown clicks on mobile
        dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            if (dropbtn) {
                dropbtn.addEventListener('click', function(e) {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                if (headerRight) {
                    headerRight.classList.remove('mobile-show');
                }
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
                if (headerRight) {
                    headerRight.classList.remove('mobile-show');
                }
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // === CAROUSEL SETUP ===
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const cards = document.querySelectorAll('.carousel-card');
    let currentSlide = 0;
    const totalSlides = cards.length;

    function updateCarousel() {
        if (!track || cards.length === 0) return;
        // Calculate card width + optional gap (adjust if your gap is different)
        const style = window.getComputedStyle(cards[0]);
        const gap = parseInt(style.marginRight) || 20; // fallback to 20px
        const cardWidth = cards[0].offsetWidth + gap;
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }

    // Dots click listeners
    if (dots.length && cards.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
    }

    // Auto-slide
    if (cards.length > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 4000);
    }

    // Initialize carousel
    updateCarousel();

    // === ABOUT SECTION ANIMATION ===
    const aboutContent = document.querySelector('.about-content');
    const aboutImage = document.querySelector('.about-image');
    const aboutSection = document.querySelector('.about-section');

    function checkScroll() {
        if (!aboutSection) return;
        const rect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Trigger when 20% of section is visible in viewport
        if (rect.top + rect.height * 0.2 < windowHeight) {
            if (aboutContent) aboutContent.classList.add('animate');
            if (aboutImage) aboutImage.classList.add('animate');
            window.removeEventListener('scroll', checkScroll); // Only once
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check on load

    // === SERVICES CAROUSEL ===
    const servicesTrack = document.getElementById('servicesCarouselTrack');
    const servicesDots = document.querySelectorAll('.services-carousel-dot');
    const servicesCards = document.querySelectorAll('#servicesCarouselTrack .service-card');
    let currentServicesSlide = 0;

    function updateServicesCarousel() {
        if (!servicesTrack || servicesCards.length === 0) return;
        const cardWidth = servicesCards[0].offsetWidth + 20;
        servicesTrack.style.transform = `translateX(-${currentServicesSlide * cardWidth}px)`;
        
        servicesDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentServicesSlide);
        });
    }

    if (servicesDots.length && servicesCards.length) {
        servicesDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentServicesSlide = index;
                updateServicesCarousel();
            });
        });

        // Auto-slide for services
        setInterval(() => {
            if (window.innerWidth <= 768) {
                currentServicesSlide = (currentServicesSlide + 1) % servicesCards.length;
                updateServicesCarousel();
            }
        }, 4000);
    }

    // === TESTIMONIALS CAROUSEL ===
    const testimonialsTrack = document.getElementById('testimonialsCarouselTrack');
    const testimonialsDots = document.querySelectorAll('.testimonials-carousel-dot');
    const testimonialsCards = document.querySelectorAll('#testimonialsCarouselTrack .testimonial-card');
    let currentTestimonialsSlide = 0;

    function updateTestimonialsCarousel() {
        if (!testimonialsTrack || testimonialsCards.length === 0) return;
        const cardWidth = testimonialsCards[0].offsetWidth + 20;
        testimonialsTrack.style.transform = `translateX(-${currentTestimonialsSlide * cardWidth}px)`;
        
        testimonialsDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonialsSlide);
        });
    }

    if (testimonialsDots.length && testimonialsCards.length) {
        testimonialsDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonialsSlide = index;
                updateTestimonialsCarousel();
            });
        });

        // Auto-slide for testimonials
        setInterval(() => {
            if (window.innerWidth <= 768) {
                currentTestimonialsSlide = (currentTestimonialsSlide + 1) % testimonialsCards.length;
                updateTestimonialsCarousel();
            }
        }, 5000);
    }

    // Initialize carousels
    updateServicesCarousel();
    updateTestimonialsCarousel();

    // Update carousels on window resize
    window.addEventListener('resize', () => {
        updateServicesCarousel();
        updateTestimonialsCarousel();
    });
});
