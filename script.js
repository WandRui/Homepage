// ===========================
// Navigation Functionality
// ===========================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scroll for anchor links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// Research Section - Expandable Cards
// ===========================

document.querySelectorAll('.research-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't toggle if clicking on a link
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        this.classList.toggle('expanded');
    });
});

// ===========================
// Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.timeline-item, .research-card, .skill-category, .activity-card, .contact-card, .stat-item'
);

animateElements.forEach(el => observer.observe(el));

// ===========================
// Scroll Indicator
// ===========================

const scrollIndicator = document.querySelector('.scroll-indicator a');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector('#about');
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ===========================
// Dynamic Year in Footer
// ===========================

const updateFooterYear = () => {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} Rui Wang. All rights reserved.`;
    }
};

updateFooterYear();

// ===========================
// Skill Tag Interaction
// ===========================

const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
    });
});

// ===========================
// Research Card Expansion (Optional)
// ===========================

// ===========================
// Research Card Interaction
// ===========================

const researchCards = document.querySelectorAll('.research-card');

researchCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('expanded')) {
            card.style.transform = 'translateY(-4px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('expanded')) {
            card.style.transform = 'translateY(0)';
        }
    });
});

// ===========================
// Scroll Progress Indicator
// ===========================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #c0c0c0, #6b7280);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===========================
// Loading Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Email Copy Functionality
// ===========================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const email = link.getAttribute('href').replace('mailto:', '');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Create temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #6b7280, #4a4a4a);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    z-index: 10000;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    animation: fadeIn 0.3s ease;
                `;
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    tooltip.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        }
    });
});

// ===========================
// Keyboard Navigation
// ===========================

document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight / 2;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let targetIndex;
            
            if (e.key === 'ArrowDown') {
                targetIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }
            
            const targetSection = sections[targetIndex];
            if (targetSection) {
                e.preventDefault();
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// ===========================
// Performance: Lazy Loading Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Accessibility: Focus Management
// ===========================

// Add focus visible class for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===========================
// Print Optimization
// ===========================

window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.research-card, .activity-card').forEach(card => {
        card.style.pageBreakInside = 'avoid';
    });
});

// ===========================
// Console Easter Egg
// ===========================

console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #6b7280;');
console.log('%cInterested in how this site was built?', 'font-size: 14px; color: #4a4a4a;');
console.log('%cCheck out the source code on GitHub: https://github.com/WandRui/Homepage', 'font-size: 12px; color: #9ca3af;');
console.log('%c\n🎓 Rui Wang - HKUST Computer Science & AI', 'font-size: 12px; font-style: italic; color: #6b7280;');
