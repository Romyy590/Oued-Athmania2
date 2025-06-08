// Mobile Menu Toggle
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav').appendChild(menuToggle);

const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

// Initial check for elements in view
window.addEventListener('load', animateOnScroll);

// Check for elements in view on scroll
window.addEventListener('scroll', animateOnScroll);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Video Background Handling
const videoBackgrounds = document.querySelectorAll('.video-background video');

videoBackgrounds.forEach(video => {
    // Ensure video plays on mobile
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    
    // Handle video loading
    video.addEventListener('loadeddata', () => {
        video.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
    });
});

// Image Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        lightbox.innerHTML = '';
        lightbox.appendChild(lightboxImg);
        lightbox.classList.add('active');
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('تم إرسال رسالتك بنجاح!');
        contactForm.reset();
    });
}

// Scroll Animation
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links {
        transition: all 0.3s ease;
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--white);
        padding: 1rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (min-width: 769px) {
        .nav-links {
            display: flex !important;
        }
    }
`;

document.head.appendChild(style); 

       
     
