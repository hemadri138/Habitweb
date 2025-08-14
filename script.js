// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .section-header, .download-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add CSS for mobile menu and animations
const style = document.createElement('style');
style.textContent = `
    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        padding: 1rem;
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu-toggle.active i {
        transform: rotate(90deg);
    }
    
    .mobile-menu-toggle i {
        transition: transform 0.3s ease;
    }
    
    .header {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
    }
    
    .feature-card, .section-header, .download-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in, .section-header.animate-in, .download-content.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card:nth-child(1) { transition-delay: 0.1s; }
    .feature-card:nth-child(2) { transition-delay: 0.2s; }
    .feature-card:nth-child(3) { transition-delay: 0.3s; }
    .feature-card:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style); 