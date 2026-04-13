// ============================================
// PAGE LOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => loader.remove(), 500);
        }
        // Start animations after load
        initAnimations();
    }, 1600);
});

// ============================================
// PARTICLE CANVAS ANIMATION
// ============================================
const canvas = document.getElementById('particle-canvas');
let ctx;
if (canvas) {
    ctx = canvas.getContext('2d');
}

let particles = [];
let animationId;

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.6 + 0.1;
        this.opacityTarget = this.opacity;
        this.opacitySpeed = (Math.random() * 0.01) + 0.005;
        this.growing = Math.random() > 0.5;
        // Colors: purple, blue, or cyan
        const colors = [
            `rgba(108, 53, 222, ${this.opacity})`,
            `rgba(0, 212, 255, ${this.opacity})`,
            `rgba(139, 92, 246, ${this.opacity})`,
        ];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.colorIndex = Math.floor(Math.random() * colors.length);
    }

    update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        // Opacity breathing
        if (this.growing) {
            this.opacity += this.opacitySpeed;
            if (this.opacity >= 0.7) this.growing = false;
        } else {
            this.opacity -= this.opacitySpeed;
            if (this.opacity <= 0.05) this.growing = true;
        }

        // Wrap around edges
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
    }

    draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        const colorPalettes = [
            `rgba(108, 53, 222, ${this.opacity})`,
            `rgba(0, 212, 255, ${this.opacity})`,
            `rgba(139, 92, 246, ${this.opacity})`,
        ];
        
        ctx.fillStyle = colorPalettes[this.colorIndex];
        ctx.fill();
        ctx.restore();
    }
}

function initParticles() {
    if (!canvas) return;
    particles = [];
    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    if (!ctx) return;
    const connectionDistance = 120;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = (1 - distance / connectionDistance) * 0.15;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(108, 53, 222, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.restore();
            }
        }
    }
}

function animateParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawConnections();
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    animationId = requestAnimationFrame(animateParticles);
}

// Initialize particles if canvas exists
if (canvas) {
    resizeCanvas();
    initParticles();
    animateParticles();

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            cancelAnimationFrame(animationId);
            resizeCanvas();
            initParticles();
            animateParticles();
        }, 200);
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// INTERSECTION OBSERVER - FADE ANIMATIONS
// ============================================
function initAnimations() {
    // Tag body so CSS can apply fade-up initial state
    document.body.classList.add('js-ready');

    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
    
    // Start counters immediately for hero stats
    initCounters();
}

// Also run on DOMContentLoaded as fallback
document.addEventListener('DOMContentLoaded', initAnimations);

// ============================================
// COUNTER ANIMATION
// ============================================
let countersStarted = false;

function animateCounter(el, target, suffix) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 20);
}

function initCounters() {
    if (countersStarted) return;
    const stats = document.querySelectorAll('.hero-stat-number');
    if (stats.length === 0) return;
    countersStarted = true;
    
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target) || 0;
        // Determine suffix from initial text
        const initialText = stat.textContent.trim();
        let suffix = '+';
        if (initialText.includes('K')) suffix = 'K+';
        
        // Immediately set a real value as fallback
        stat.textContent = target + suffix;
        
        // Then animate from 0
        animateCounter(stat, target, suffix);
    });
}

// ============================================
// NEWSLETTER SUBMIT
// ============================================
window.handleNewsletterSubmit = function(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const btn = e.target.querySelector('button');
    if (!input || !btn) return;

    const email = input.value;
    
    // Simulate submission
    const originalText = btn.textContent;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #00FF88, #00C870)';
    btn.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.4)';
    input.value = '';
    input.disabled = true;
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
        input.disabled = false;
    }, 3000);
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function setActiveNav() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Exact match for home page
        if ((path === '/' || path === '/index.html' || path === '') && (href === '/' || href === '/index.html')) {
            link.classList.add('active');
        } else if (href !== '/' && path.includes(href)) {
            link.classList.add('active');
        }
    });
}

// Run on load
setActiveNav();

// ============================================
// FEATURE CARDS - MOUSE MOVE TILT EFFECT
// ============================================
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.1s ease';
    });
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

console.log('%c🚀 SanzyAI - AI-Powered Hub', 'color: #6C35DE; font-size: 18px; font-weight: bold;');
console.log('%cWebsite loaded successfully ✓', 'color: #00FF88; font-size: 14px;');
