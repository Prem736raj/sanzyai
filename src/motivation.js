/**
 * SanzyAI Immersive Motivation Hub
 * High-performance animation and interaction logic
 */

const quotes = [
    { text: "AI isn't the finish line, it's the jet fuel for your imagination.", author: "SanzyAI" },
    { text: "We don't just build tools; we build the future you've always imagined.", author: "The Developer" },
    { text: "The best way to predict the future is to build it with AI.", author: "Modern Creator" },
    { text: "Your creativity is infinite. AI is just the multiplier.", author: "Future Thinker" },
    { text: "Great things never came from comfort zones. Start building today.", author: "The Developer" },
    { text: "Don't just watch the AI revolution. Lead it.", author: "SanzyAI" },
    { text: "The only limit to AI is the boundary of our own curiosity.", author: "Visionary" }
];

let currentQuoteIndex = 0;
const quoteEl = document.getElementById('quote-text');
const authorEl = document.getElementById('quote-author');

function updateQuote() {
    quoteEl.classList.remove('active');
    authorEl.classList.remove('active');

    setTimeout(() => {
        const quote = quotes[currentQuoteIndex];
        quoteEl.textContent = `"${quote.text}"`;
        authorEl.textContent = `— ${quote.author}`;
        
        quoteEl.classList.add('active');
        authorEl.classList.add('active');
        
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }, 400); // Reduced delay for faster initial appearance
}

// Cycle quotes
updateQuote();
let quoteInterval = setInterval(updateQuote, 7000);

/* ===== HIGH-END CANVAS PARTICLE ENGINE ===== */
const canvas = document.getElementById('energy-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: -1000, y: -1000, active: false };

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
});

window.addEventListener('mouseleave', () => {
    mouse.active = false;
});

class Particle {
    constructor(isExplosion = false, x, y) {
        this.isExplosion = isExplosion;
        this.init(x, y);
    }

    init(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = this.isExplosion ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * (this.isExplosion ? 10 : 1.5);
        this.speedY = (Math.random() - 0.5) * (this.isExplosion ? 10 : 1.5);
        this.color = Math.random() > 0.5 ? '#6C35DE' : '#00D4FF';
        if (this.isExplosion) this.color = '#FF8C00';
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = this.isExplosion ? 1.0 : -1; // -1 means infinite
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.life !== -1) {
            this.life -= 0.02;
            this.size *= 0.98;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.opacity * (this.life === -1 ? 1 : this.life));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a small glow to explosion particles
        if (this.isExplosion) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    // Ambient particles
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Connect particles with lines if they are close
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100 && !particles[i].isExplosion && !particles[j].isExplosion) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        
        if (p.life !== -1 && (p.life <= 0 || p.size <= 0.1)) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}

initParticles();
animate();

/* ===== CORE INTERACTION ===== */
const core = document.getElementById('energyCore');
const audio = document.getElementById('ambient-audio');

core.addEventListener('pointerdown', (e) => { // Use pointerdown for multi-device support
    e.preventDefault();
    triggerInteraction();
});

// Direct function to handle interaction
window.triggerInteraction = function() {
    // Start audio on first interaction
    if (audio.paused) {
        audio.volume = 0.3;
        audio.play().catch(() => {});
    }

    // Trigger Quote update manually
    clearInterval(quoteInterval);
    updateQuote();
    quoteInterval = setInterval(updateQuote, 7000);

    // Create massive explosion
    const rect = core.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 60; i++) {
        particles.push(new Particle(true, centerX, centerY));
    }

    // Screen Shake effect
    document.body.style.animation = 'none';
    void document.body.offsetWidth; // trigger reflow
    document.body.style.animation = 'screenShake 0.5s cubic-bezier(.36,.07,.19,.97) both';
}

// Add screen shake keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes screenShake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
`;
document.head.appendChild(style);
