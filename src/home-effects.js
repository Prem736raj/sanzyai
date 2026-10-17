// Decorative work starts on idle and stops when the hero is offscreen or the tab is hidden.
export function startHomeEffects() {
    const canvas = document.getElementById('particle-canvas');
    const context = canvas?.getContext('2d');
    if (!context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let frame;
    let resizeTimer;
    let width = 0;
    let height = 0;
    let particles = [];

    function resize() {
        width = canvas.clientWidth || window.innerWidth;
        height = canvas.parentElement.clientHeight;
        const scale = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = width * scale;
        canvas.height = height * scale;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        particles = Array.from({ length: Math.min(60, Math.floor(width * height / 18000)) }, () => ({
            x: Math.random() * width, y: Math.random() * height,
            dx: (Math.random() - 0.5) * 0.5, dy: (Math.random() - 0.5) * 0.5,
        }));
    }
    function paint() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'rgba(139, 92, 246, 0.45)';
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x = (p.x + p.dx + width) % width;
            p.y = (p.y + p.dy + height) % height;
            context.beginPath(); context.arc(p.x, p.y, 1.5, 0, Math.PI * 2); context.fill();
            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const distance = Math.hypot(p.x - q.x, p.y - q.y);
                if (distance >= 100) continue;
                context.strokeStyle = `rgba(108, 53, 222, ${(1 - distance / 100) * 0.15})`;
                context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(q.x, q.y); context.stroke();
            }
        }
        frame = requestAnimationFrame(paint);
    }
    function reconcile() {
        cancelAnimationFrame(frame);
        const running = visible && !motion.matches && document.visibilityState === 'visible';
        canvas.dataset.effects = running ? 'running' : 'paused';
        if (running) frame = requestAnimationFrame(paint);
    }
    resize();
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; reconcile(); }).observe(canvas.parentElement);
    document.addEventListener('visibilitychange', reconcile);
    motion.addEventListener('change', reconcile);
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { resize(); reconcile(); }, 150);
    }, { passive: true });
    reconcile();
}
