const icons = [
    // 0: Elegant Lotus (Layered)
    `<svg viewBox="0 0 100 100">
        <path d="M50 20C50 20 35 45 35 60C35 75 50 85 50 85C50 85 65 75 65 60C65 45 50 20 50 20Z" fill="currentColor" opacity="0.9"/>
        <path d="M50 30C50 30 20 50 20 70C20 85 45 90 50 90" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M50 30C50 30 80 50 80 70C80 85 55 90 50 90" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
        <circle cx="50" cy="65" r="5" fill="white" opacity="0.3"/>
    </svg>`,
    // 1: Abstract Zen Brush Circle
    `<svg viewBox="0 0 100 100">
        <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50" stroke="currentColor" stroke-width="8" stroke-linecap="round" fill="none" stroke-dasharray="200 50"/>
        <path d="M40 40Q50 30 60 40Q70 50 50 70" stroke="currentColor" stroke-width="4" fill="none" opacity="0.7"/>
    </svg>`,
    // 2: Organic Intertwined Leaves
    `<svg viewBox="0 0 100 100">
        <path d="M30 80C30 80 10 60 10 40C10 20 30 10 50 40C70 10 90 20 90 40C90 60 70 80 50 60C30 80 30 80 30 80Z" fill="currentColor" opacity="0.8"/>
        <path d="M50 40L50 90" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <path d="M30 65L50 55" stroke="white" stroke-width="1.5" opacity="0.4"/>
        <path d="M70 65L50 55" stroke="white" stroke-width="1.5" opacity="0.4"/>
    </svg>`,
    // 3: Minimalist Yoga Figure
    `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="25" r="8" fill="currentColor"/>
        <path d="M50 35C40 35 25 45 20 65M50 35C60 35 75 45 80 65" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M50 35L50 75M50 75L30 95M50 75L70 95" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8"/>
    </svg>`,
    // 4: Geometric Mountain & Sun
    `<svg viewBox="0 0 100 100">
        <circle cx="70" cy="30" r="15" fill="currentColor" opacity="0.3"/>
        <path d="M10 80L40 30L65 80" fill="currentColor" opacity="0.9"/>
        <path d="M45 80L70 45L95 80" fill="currentColor" opacity="0.6"/>
        <rect x="10" y="85" width="80" height="2" rx="1" fill="currentColor" opacity="0.4"/>
    </svg>`,
    // 5: Abstract Wave Harmony
    `<svg viewBox="0 0 100 100">
        <path d="M10 50Q30 30 50 50T90 50" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M10 70Q30 50 50 70T90 70" stroke="currentColor" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M10 30Q30 10 50 30T90 30" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.3"/>
    </svg>`,
    // 6: Crystalline Energy
    `<svg viewBox="0 0 100 100">
        <path d="M50 10L85 40L50 90L15 40Z" fill="currentColor" opacity="0.8"/>
        <path d="M50 10L50 90" stroke="white" stroke-width="1" opacity="0.5"/>
        <path d="M15 40L85 40" stroke="white" stroke-width="1" opacity="0.5"/>
        <path d="M15 40L50 55L85 40" fill="white" opacity="0.2"/>
    </svg>`,
    // 7: Modern Infinity Petal
    `<svg viewBox="0 0 100 100">
        <path d="M50 50C20 20 10 50 50 80C90 50 80 20 50 50Z" fill="currentColor"/>
        <path d="M50 50C80 80 90 50 50 20C10 50 20 80 50 50Z" fill="currentColor" opacity="0.6"/>
        <circle cx="50" cy="50" r="4" fill="white"/>
    </svg>`,
    // 8: Abstract Shield of Peace
    `<svg viewBox="0 0 100 100">
        <path d="M50 10C50 10 85 20 85 50C85 80 50 90 50 90C50 90 15 80 15 50C15 20 50 10 50 10Z" stroke="currentColor" stroke-width="4" fill="none"/>
        <path d="M30 45Q50 35 70 45Q50 75 30 45" fill="currentColor" opacity="0.7"/>
        <path d="M50 25L50 75" stroke="currentColor" stroke-width="2" opacity="0.3"/>
    </svg>`,
    // 9: Organic Vine Flourish
    `<svg viewBox="0 0 100 100">
        <path d="M50 90C50 90 20 60 20 40C20 20 40 20 50 40C60 20 80 20 80 40C80 60 50 90 50 90Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="50" cy="45" r="12" fill="currentColor" opacity="0.4"/>
        <path d="M35 45Q50 60 65 45" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`
];

const styles = ["Minimal", "Abstract", "Organic", "Symbolic", "Modern", "Geometric", "Hand-drawn", "Sleek", "Bold", "Gradient"];
const colors = [
    { name: "Teal Breeze", hex: "#008080", bg: "#e0f2f1" },
    { name: "Lavender Calm", hex: "#9575cd", bg: "#f3e5f5" },
    { name: "Sage Earth", hex: "#81c784", bg: "#f1f8e9" },
    { name: "Sunset Gold", hex: "#ffb74d", bg: "#fff3e0" },
    { name: "Ocean Deep", hex: "#4fc3f7", bg: "#e1f5fe" },
    { name: "Rose Petal", hex: "#f06292", bg: "#fce4ec" },
    { name: "Zen Grey", hex: "#90a4ae", bg: "#eceff1" },
    { name: "Nature Green", hex: "#4caf50", bg: "#e8f5e9" },
    { name: "Berry Vitality", hex: "#e91e63", bg: "#fce4ec" },
    { name: "Indigo Night", hex: "#3f51b5", bg: "#e8eaf6" }
];

const generatedLogos = [];

function generateVault() {
    for (let i = 1; i <= 100; i++) {
        const iconIndex = Math.floor(Math.random() * icons.length);
        const styleIndex = Math.floor(Math.random() * styles.length);
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        const style = styles[styleIndex];
        const color = colors[colorIndex];
        const icon = icons[iconIndex];

        const id = i.toString().padStart(3, '0');
        const prompt = `A professional ${style.toLowerCase()} logo for 'Aurora', a wellness and meditation app. Featuring a ${color.name.toLowerCase()} color palette. Central icon is a stylized ${iconIndex === 0 ? 'lotus' : iconIndex === 1 ? 'leaf' : 'wellness symbol'}. Minimalist, high-quality, 4k, vector style, white background, trending on Dribbble. --v 6.0`;
        
        generatedLogos.push({
            id: `#${id}`,
            title: `Aurora Logo ${id}`,
            style: style,
            category: style.toLowerCase().includes("minimal") ? "minimal" : style.toLowerCase().includes("abstract") ? "abstract" : style.toLowerCase().includes("organic") ? "organic" : "symbolic",
            color: color,
            icon: icon,
            prompt: prompt,
            tags: ["Aurora", style, color.name, "Wellness"]
        });
    }
}

function renderLogos(filter = "all", search = "") {
    const grid = document.getElementById('logoGrid');
    if (!grid) return;

    let filtered = generatedLogos;
    
    if (filter !== "all") {
        filtered = filtered.filter(l => l.category === filter);
    }
    
    if (search) {
        const term = search.toLowerCase();
        filtered = filtered.filter(l => 
            l.style.toLowerCase().includes(term) || 
            l.title.toLowerCase().includes(term) ||
            l.prompt.toLowerCase().includes(term)
        );
    }

    grid.innerHTML = filtered.map(l => `
        <div class="logo-card" data-id="${l.id}">
            <div class="logo-visual" style="color: ${l.color.hex}">
                ${l.icon}
            </div>
            <div class="logo-info">
                <span class="logo-id">${l.id}</span>
                <span class="logo-style">${l.style} Style</span>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-sm full-width">View Details</button>
            </div>
        </div>
    `).join('');

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results">No logos found matching your search.</div>';
    }
}

function openModal(id) {
    const logo = generatedLogos.find(l => l.id === id);
    if (!logo) return;

    const modal = document.getElementById('logoModal');
    const view = document.getElementById('modalLogoView');
    const title = document.getElementById('modalTitle');
    const tags = document.getElementById('modalTags');
    const prompt = document.getElementById('modalPrompt');
    const modify = document.getElementById('modifyPromptInput');

    view.innerHTML = logo.icon;
    view.style.color = logo.color.hex;
    title.textContent = logo.title;
    tags.innerHTML = logo.tags.map(t => `<span class="tag">${t}</span>`).join('');
    prompt.textContent = logo.prompt;
    modify.value = `${logo.prompt} --ar 1:1 --stylize 250 --chaos 10`;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
    generateVault();
    renderLogos();

    // Search
    const searchInp = document.getElementById('logoSearch');
    searchInp.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        renderLogos(activeFilter, e.target.value);
    });

    // Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLogos(btn.dataset.filter, searchInp.value);
        });
    });

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    // Hamburger Menu
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
    }

    // Modal Events
    const grid = document.getElementById('logoGrid');
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.logo-card');
        if (card) {
            openModal(card.dataset.id);
        }
    });

    const closeBtn = document.getElementById('closeModal');
    const modal = document.getElementById('logoModal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Copy functionality
    document.getElementById('copyPrompt').addEventListener('click', () => {
        const text = document.getElementById('modalPrompt').textContent;
        navigator.clipboard.writeText(text);
        const btn = document.getElementById('copyPrompt');
        btn.textContent = "Copied!";
        setTimeout(() => btn.textContent = "Copy", 2000);
    });

    document.getElementById('copyModify').addEventListener('click', () => {
        const text = document.getElementById('modifyPromptInput').value;
        navigator.clipboard.writeText(text);
        const btn = document.getElementById('copyModify');
        btn.textContent = "Prompt Copied!";
        setTimeout(() => btn.textContent = "Copy Modification Prompt", 2000);
    });
});
