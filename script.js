// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Parallax Scrolling Effect
function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxContainer = document.querySelector('.parallax-container');

    if (parallaxContainer) {
        const layers = parallaxContainer.querySelectorAll('.parallax-layer');

        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.5; // Adjust speed for each layer
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    // Handle hero content fade effect on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Calculate how much the user has scrolled relative to the hero section height
        const heroHeight = document.querySelector('.hero-section').offsetHeight;
        const scrollPercent = Math.min(scrolled / heroHeight * 1.5, 1); // Membuat efek lebih cepat
        // Apply fade effect based on scroll percentage
        heroContent.style.opacity = 1 - scrollPercent;
    }
}

// Initialize parallax effect as soon as DOM is ready and update on scroll
document.addEventListener('DOMContentLoaded', updateParallax);
window.addEventListener('load', updateParallax);
window.addEventListener('scroll', updateParallax);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll - Elements fade in when they come into view
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.event-card, .attraction-card, .culinary-card, .map-container');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate-on-scroll', 'visible');
        }
    });
};

// Initialize animations on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 300) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});