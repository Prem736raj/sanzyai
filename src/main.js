import { previewProducts } from './catalog-summary.js';

document.querySelectorAll('[data-catalog-count]').forEach(el => {
    el.dataset.target = String(previewProducts.length);
    el.textContent = String(previewProducts.length);
});

const featuredProducts = document.getElementById('featuredProducts');
if (featuredProducts) {
    featuredProducts.replaceChildren(...[1, 5, 2].map(id => {
        const product = previewProducts.find(item => item.id === id);
        const card = document.createElement('article');
        card.className = 'product-card ui-card';
        const title = document.createElement('h3');
        title.className = 'product-name';
        title.textContent = product.name;
        const description = document.createElement('p');
        description.className = 'product-desc';
        description.textContent = product.desc;
        const footer = document.createElement('div');
        footer.className = 'product-footer';
        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = 'Free sample';
        const link = document.createElement('a');
        link.className = 'btn btn-primary btn-sm ui-button';
        link.href = '/prompt-store';
        link.textContent = 'View samples';
        footer.append(price, link);
        card.append(title, description, footer);
        return card;
    }));
    featuredProducts.dataset.state = 'ready';
    featuredProducts.setAttribute('aria-busy', 'false');
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
}, { passive: true });

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

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// INTERSECTION OBSERVER - FADE ANIMATIONS
// ============================================
function initAnimations() {
    document.body.classList.add('js-ready');

    const fadeElements = document.querySelectorAll('.fade-up');
    if (!fadeElements.length) return;

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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
