// Configuration
const QUOTES = [
    { text: "Great things never came from comfort zones. Start building today.", author: "The Developer" },
    { text: "AI isn't the finish line, it's the jet fuel for your imagination.", author: "SanzyAI" },
    { text: "Your creativity is infinite. AI is just the multiplier.", author: "Future Thinker" },
    { text: "We don't just build tools; we build the future you've always imagined.", author: "The Developer" },
    { text: "Don't just watch the AI revolution. Lead it.", author: "SanzyAI" }
];

const COLORS = ["#6C63FF", "#3B82F6", "#F97316", "#EC4899", "#10B981"];
const SPARKS = [
    { emoji: "⚡", x: -80, y: -70 },
    { emoji: "✨", x: 80, y: -60 },
    { emoji: "🚀", x: -90, y: 20 },
    { emoji: "💡", x: 90, y: 30 },
    { emoji: "🔥", x: 0, y: -100 },
    { emoji: "⭐", x: -60, y: 80 },
    { emoji: "💫", x: 70, y: 80 },
    { emoji: "🎯", x: 0, y: 100 }
];

const RINGS = [
    { size: 70, duration: 0.6, color: "#6C63FF", delay: 0 },
    { size: 100, duration: 0.8, color: "#3B82F6", delay: 0.1 },
    { size: 130, duration: 1.0, color: "#F97316", delay: 0.2 }
];

// Elements
const logoContainer = document.getElementById('logoAnimation');
const mainLogo = document.getElementById('mainLogo');
const logoImg = mainLogo.querySelector('.logo-official-img');
const innerGlow = document.getElementById('innerGlow');
const brandName = document.getElementById('brandName');
const logoTooltip = document.getElementById('logoTooltip');

const ringLayer = document.getElementById('ring-layer');
const dotLayer = document.getElementById('dot-layer');
const sparkLayer = document.getElementById('spark-layer');
const shockwaveLayer = document.getElementById('shockwave-layer');

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');

let isAnimating = false;
let currentQuoteIdx = 0;

// Functions
const triggerBurst = () => {
    // 1. Triple Rings
    ringLayer.innerHTML = '';
    RINGS.forEach(r => {
        const ring = document.createElement('div');
        ring.className = 'magnetic-ring';
        ring.style.width = `${r.size}px`;
        ring.style.height = `${r.size}px`;
        ring.style.borderColor = r.color;
        ring.style.animation = `ringBurst ${r.duration}s ease-out forwards ${r.delay}s`;
        ringLayer.appendChild(ring);
    });

    // 2. Dot Particles (16)
    dotLayer.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const dot = document.createElement('div');
        dot.className = 'magnetic-dot';
        const angle = (i * 360) / 16;
        const radian = (angle * Math.PI) / 180;
        const distance = 100 + Math.random() * 20;
        const x = Math.cos(radian) * distance;
        const y = Math.sin(radian) * distance;
        const size = Math.random() * 6 + 3;
        const color = COLORS[i % COLORS.length];

        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.backgroundColor = color;
        dot.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        dot.style.setProperty('--x', `${x}px`);
        dot.style.setProperty('--y', `${y}px`);
        dot.style.animation = `dotBurst 0.9s ease-out forwards ${i * 0.02}s`;
        dotLayer.appendChild(dot);
    }

    // 3. Emoji Sparks
    sparkLayer.innerHTML = '';
    SPARKS.forEach((s, i) => {
        const spark = document.createElement('div');
        spark.className = 'emoji-spark';
        spark.textContent = s.emoji;
        spark.style.setProperty('--x', `${s.x}px`);
        spark.style.setProperty('--y', `${s.y}px`);
        spark.style.animation = `sparkFly 1s ease-out forwards ${i * 0.05}s`;
        sparkLayer.appendChild(spark);
    });

    // 4. Shockwave
    shockwaveLayer.innerHTML = '';
    const shock = document.createElement('div');
    shock.className = 'shockwave';
    shock.style.animation = 'shockwaveFlash 0.5s ease-out forwards';
    shockwaveLayer.appendChild(shock);
};

const cycleQuote = () => {
    quoteText.classList.remove('active');
    quoteAuthor.classList.remove('active');
    
    setTimeout(() => {
        currentQuoteIdx = (currentQuoteIdx + 1) % QUOTES.length;
        quoteText.textContent = QUOTES[currentQuoteIdx].text;
        quoteAuthor.textContent = `— ${QUOTES[currentQuoteIdx].author}`;
        
        quoteText.classList.add('active');
        quoteAuthor.classList.add('active');
    }, 1000);
};

const handleLogoClick = () => {
    if (isAnimating) return;
    isAnimating = true;

    // Show Tooltip
    logoTooltip.classList.add('active');

    // Visual Burst
    triggerBurst();

    // Button & Text Animations
    mainLogo.classList.add('animating-btn');
    logoImg.classList.add('animating-img');
    innerGlow.classList.add('animating-glow');
    brandName.classList.add('animating-brand');

    // Cycle Quote
    cycleQuote();

    // Reset
    setTimeout(() => {
        isAnimating = false;
        logoTooltip.classList.remove('active');
        mainLogo.classList.remove('animating-btn');
        logoImg.classList.remove('animating-img');
        innerGlow.classList.remove('animating-glow');
        brandName.classList.remove('animating-brand');
    }, 1500);
};

// Event Listeners
logoContainer.addEventListener('click', handleLogoClick);

// Background Canvas
const canvas = document.getElementById('energy-canvas');
const ctx = canvas.getContext('2d');
let particles_bg = [];

class BackgroundParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random() * 0.3;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

const resize = () => {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    particles_bg = Array.from({ length: 80 }, () => new BackgroundParticle());
};
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles_bg.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
};
window.addEventListener('resize', resize);
resize(); animate();
