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

// Video Hero Content Parallax and Fade Effects on Scroll
function updateHeroEffects() {
    // Handle hero content fade and parallax effects on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const scrolled = window.pageYOffset;

        // Calculate how much the user has scrolled relative to the hero section height
        const heroHeight = document.querySelector('.hero-section').offsetHeight;
        const scrollPercent = Math.min(scrolled / heroHeight, 1); // Value between 0 and 1

        // Apply fade effect based on scroll percentage
        heroContent.style.opacity = 1 - scrollPercent;

        // Apply parallax effect (vertical movement) based on scroll
        const parallaxDistance = scrolled * 0.5; // Adjust multiplier to control parallax intensity
        heroContent.style.transform = `translateY(${parallaxDistance}px)`;
    }
}

// Initialize hero effects as soon as DOM is ready and update on scroll
document.addEventListener('DOMContentLoaded', updateHeroEffects);
window.addEventListener('load', updateHeroEffects);
window.addEventListener('scroll', updateHeroEffects);

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