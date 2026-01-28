// ========================================
// LogiConnect - Main JavaScript File
// Animations, Interactivity, and Utilities
// ========================================

// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// SCROLL ANIMATIONS (Fade In on Scroll)
// ========================================

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate delay based on element index
                const index = Array.from(elements).indexOf(entry.target);
                const delay = index * 0.1;

                entry.target.style.animationDelay = delay + 's';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// CONTACT FORM HANDLING
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const company = document.getElementById('company').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !message || !service) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Message length validation
        if (message.length < 10) {
            showFormMessage('Message must be at least 10 characters long.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call (in real app, this would send to a server)
        setTimeout(() => {
            showFormMessage(
                'Thank you for your message! We will contact you within 24 hours.',
                'success'
            );

            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Scroll to message
            const formMessage = document.getElementById('formMessage');
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// LAZY LOADING SIMULATION
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// SMOOTH HEADER SHADOW ON SCROLL
// ========================================

function initHeaderScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ========================================
// COUNTER ANIMATION FOR STATISTICS
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        // Trigger when in view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ========================================
// TOOLTIP INITIALIZATION
// ========================================

function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

            setTimeout(() => tooltip.classList.add('show'), 0);

            this.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
}

// ========================================
// PARALLAX SCROLLING EFFECT
// ========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            const yPos = distance * 0.5; // Adjust speed (0.5 = 50% of scroll speed)

            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color, #0066CC);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1)';
    });
}

// ========================================
// FAQ ACCORDION
// ========================================

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                const answer = item.querySelector('.faq-answer');
                const isOpen = answer.style.maxHeight;

                // Close all other items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer && otherItem !== item) {
                        otherAnswer.style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (isOpen) {
                    answer.style.maxHeight = null;
                    question.classList.remove('active');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// PERFORMANCE: Debounce Function
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// DOCUMENT READY - INITIALIZE ALL FEATURES
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('LogiConnect Portfolio - Initialization Started');

    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    updateActiveNavLink();
    initLazyLoading();
    initHeaderScroll();
    animateCounters();
    initTooltips();
    initParallax();
    initBackToTop();
    initFAQAccordion();

    console.log('LogiConnect Portfolio - All Features Initialized');
});

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

window.addEventListener('resize', debounce(() => {
    updateActiveNavLink();
}, 250));

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Error occurred:', event.error);
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🏢 LogiConnect Portfolio', 'color: #0066CC; font-size: 20px; font-weight: bold;');
console.log('%cVersion 1.0.0', 'color: #666; font-size: 12px;');
console.log('%cFor inquiries, visit: contact.html', 'color: #777; font-size: 11px;');
