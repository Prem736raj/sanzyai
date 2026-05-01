const icons = [
    // Lotus
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,22C12,22 4,16 4,10C4,5.58 7.58,2 12,2C16.42,2 20,5.58 20,10C20,16 12,22 12,22M12,4C8.69,4 6,6.69 6,10C6,13.79 10.42,18.38 12,20.03C13.58,18.37 18,13.77 18,10C18,6.69 15.31,4 12,4Z"/></svg>',
    // Leaf
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/></svg>',
    // Sun
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9M12,2L14.39,5.42L18.35,4.35L17.28,8.31L20.7,10.7L17.28,13.09L18.35,17.05L14.39,15.98L12,19.4L9.61,15.98L5.65,17.05L6.72,13.09L3.3,10.7L6.72,8.31L5.65,4.35L9.61,5.42L12,2Z"/></svg>',
    // Heart
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/></svg>',
    // Sparkle
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z"/></svg>',
    // Moon
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4.03L13.5,1L14.56,4.03L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C18.39,15.92 17.77,15.96 17.12,16.07C11.73,17.01 8.1,22.06 9,27.44C9.12,28.16 9.32,28.84 9.6,29.47C4.07,27.25 1.34,21.03 3.56,15.5C5.78,9.97 12,7.24 17.53,9.46C19.33,10.18 20.73,11.5 21.6,13.13C20.87,12.69 20,12.5 19.1,12.5C18.89,12.5 18.68,12.52 18.47,12.55C18.61,13.66 18.78,14.8 18.97,15.95Z"/></svg>',
    // Mountain
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z"/></svg>',
    // Tree
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11,21V18.12C8.61,17.72 6.5,16.22 5.31,14.07C4.12,11.93 4,9.36 5,7.25C5.43,6.34 6.03,5.53 6.78,4.87C7.53,4.21 8.42,3.71 9.38,3.41C10.34,3.11 11.36,3 12.38,3.1C13.4,3.2 14.4,3.5 15.31,4C17.22,5 18.53,6.8 18.9,8.87C19.27,10.94 18.66,13.08 17.25,14.69C16.8,15.2 16.27,15.63 15.68,15.96C15.09,16.29 14.45,16.51 13.78,16.63L13,21H11Z"/></svg>',
    // Wave
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C15.31,6 18,8.69 18,12C18,15.31 15.31,18 12,18M12,8C9.79,8 8,9.79 8,12C8,14.21 9.79,16 12,16C14.21,16 16,14.21 16,12C16,9.79 14.21,8 12,8M12,4V2C17.5,2 22,6.5 22,12S17.5,22 12,22V20C16.42,20 20,16.42 20,12S16.42,4 12,4M12,4C7.58,4 4,7.58 4,12S7.58,20 12,20V22C6.5,22 2,17.5 2,12S6.5,2 12,2V4Z"/></svg>',
    // Drops
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C12,2 6,8.39 6,12.75C6,16.75 8.69,20 12,20C15.31,20 18,16.75 18,12.75C18,8.39 12,2 12,2M12,18C9.79,18 8,16.21 8,14C8,14 8,13 12,9C16,13 16,14 16,14C16,16.21 14.21,18 12,18Z"/></svg>'
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
        const prompt = `A professional ${style.toLowerCase()} logo for a wellness and meditation app, featuring a ${color.name.toLowerCase()} color palette. Central icon is a stylized ${iconIndex === 0 ? 'lotus' : iconIndex === 1 ? 'leaf' : 'wellness symbol'}. Minimalist, high-quality, 4k, vector style, white background, trending on Dribbble. --v 6.0`;
        
        generatedLogos.push({
            id: `#${id}`,
            title: `Wellness Logo ${id}`,
            style: style,
            category: style.toLowerCase().includes("minimal") ? "minimal" : style.toLowerCase().includes("abstract") ? "abstract" : style.toLowerCase().includes("organic") ? "organic" : "symbolic",
            color: color,
            icon: icon,
            prompt: prompt,
            tags: [style, color.name, "Wellness", "AI Gen"]
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
