// Initialize Lucide Icons
lucide.createIcons();

// Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const currentYearSpan = document.getElementById('current-year');

// Set Current Year
if(currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
    mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
});

// Close Mobile Menu on Link Click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons();
    });
});

// Intersection Observer for Scroll Animations
const observeElements = (selector) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        observer.observe(el);
    });
};

// Start Observing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements('.fade-in-element');
    observeElements('.reveal-up');
    observeElements('.reveal-left');
    observeElements('.reveal-right');
    
    // Trigger initial state check (for elements already in viewport on load)
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 100);
});

// Menu Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');
        
        const filterValue = btn.textContent.trim().toLowerCase();

        menuCards.forEach((card) => {
            const category = card.dataset.category ? card.dataset.category.toLowerCase() : 'all items';
            
            if (filterValue === 'all items' || filterValue === 'all' || category === filterValue) {
                card.style.display = 'flex';
                // Small timeout to allow display:flex to apply before transition
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                // Hide element after transition
                setTimeout(() => {
                    if (!btn.classList.contains('active')) return;
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});
