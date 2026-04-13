// =============================================
// COURSE DATA
// =============================================
const modules = [
    {
        id:1, num:'Module 1', title:'Domain Name', emoji:'🌐',
        color:'rgba(0,212,255,0.15)', border:'rgba(0,212,255,0.3)',
        duration:'1 hour', lessons:6,
        desc:'Learn everything about domain names — what they are, how to choose one, and where to buy it cheaply.',
        lessonList:[
            { id:'1.1', title:'What is a Domain Name?', dur:'8 min', hasVideo:true, hasQuiz:true },
            { id:'1.2', title:'How to Choose the Perfect Domain Name', dur:'12 min', hasVideo:true, hasQuiz:true },
            { id:'1.3', title:'Best Domain Registrars Compared', dur:'10 min', hasVideo:true, hasQuiz:false },
            { id:'1.4', title:'How to Buy a Domain Step by Step', dur:'15 min', hasVideo:true, hasQuiz:true },
            { id:'1.5', title:'Domain Extensions Explained (.com .io .ai)', dur:'8 min', hasVideo:false, hasQuiz:true },
            { id:'1.6', title:'Domain Privacy Protection — Do You Need It?', dur:'7 min', hasVideo:true, hasQuiz:false },
        ]
    },
    {
        id:2, num:'Module 2', title:'Hosting & Server', emoji:'☁️',
        color:'rgba(108,53,222,0.15)', border:'rgba(108,53,222,0.3)',
        duration:'1.5 hours', lessons:6,
        desc:'Understand web hosting, compare options and set up your server the right way.',
        lessonList:[
            { id:'2.1', title:'What is Web Hosting? Simple Explanation', dur:'10 min', hasVideo:true, hasQuiz:true },
            { id:'2.2', title:'Types of Hosting: Shared, VPS, Cloud', dur:'14 min', hasVideo:true, hasQuiz:true },
            { id:'2.3', title:'Best FREE Hosting Options 2025', dur:'12 min', hasVideo:true, hasQuiz:false },
            { id:'2.4', title:'Hostinger Setup Tutorial', dur:'20 min', hasVideo:true, hasQuiz:false },
            { id:'2.5', title:'Connecting Domain to Hosting', dur:'15 min', hasVideo:true, hasQuiz:true },
            { id:'2.6', title:'SSL Certificate — What and How', dur:'9 min', hasVideo:false, hasQuiz:true },
        ]
    },
    {
        id:3, num:'Module 3', title:'Build with AI Tools', emoji:'🤖',
        color:'rgba(0,255,136,0.1)', border:'rgba(0,255,136,0.25)',
        duration:'2 hours', lessons:6,
        desc:'Use the best AI tools to build your website without code — from ChatGPT to Framer and Bubble.',
        lessonList:[
            { id:'3.1', title:'Best AI Website Builders 2025', dur:'15 min', hasVideo:true, hasQuiz:true },
            { id:'3.2', title:'Build a Website with ChatGPT', dur:'22 min', hasVideo:true, hasQuiz:true },
            { id:'3.3', title:'Build with Framer (No Code)', dur:'25 min', hasVideo:true, hasQuiz:false },
            { id:'3.4', title:'Build with Bubble.io', dur:'20 min', hasVideo:true, hasQuiz:false },
            { id:'3.5', title:'Adding Pages and Navigation', dur:'12 min', hasVideo:true, hasQuiz:true },
            { id:'3.6', title:'Making it Mobile Friendly', dur:'10 min', hasVideo:false, hasQuiz:true },
        ]
    },
    {
        id:4, num:'Module 4', title:'Design & Content', emoji:'✨',
        color:'rgba(255,107,53,0.12)', border:'rgba(255,107,53,0.25)',
        duration:'1.5 hours', lessons:6,
        desc:'Master design basics and create stunning content with AI tools even if you are not a designer.',
        lessonList:[
            { id:'4.1', title:'Design Basics for Non-Designers', dur:'14 min', hasVideo:true, hasQuiz:true },
            { id:'4.2', title:'Colors and Fonts That Work', dur:'12 min', hasVideo:true, hasQuiz:false },
            { id:'4.3', title:'Creating a Logo with AI (Free)', dur:'15 min', hasVideo:true, hasQuiz:false },
            { id:'4.4', title:'Writing Website Content with AI', dur:'18 min', hasVideo:true, hasQuiz:true },
            { id:'4.5', title:'Adding Images (Free Stock Photos)', dur:'10 min', hasVideo:false, hasQuiz:false },
            { id:'4.6', title:'Making it Look Professional', dur:'11 min', hasVideo:true, hasQuiz:true },
        ]
    },
    {
        id:5, num:'Module 5', title:'Launch & Publish', emoji:'🚀',
        color:'rgba(255,184,0,0.12)', border:'rgba(255,184,0,0.25)',
        duration:'1 hour', lessons:6,
        desc:'Everything you need to go live — from final checks to submitting to Google.',
        lessonList:[
            { id:'5.1', title:'Pre-Launch Checklist', dur:'10 min', hasVideo:true, hasQuiz:true },
            { id:'5.2', title:'Connecting Domain to Website', dur:'12 min', hasVideo:true, hasQuiz:false },
            { id:'5.3', title:'Testing Your Website', dur:'8 min', hasVideo:true, hasQuiz:false },
            { id:'5.4', title:'Google Search Console Setup', dur:'14 min', hasVideo:true, hasQuiz:true },
            { id:'5.5', title:'Google Analytics Setup', dur:'12 min', hasVideo:false, hasQuiz:false },
            { id:'5.6', title:'Submitting to Search Engines', dur:'7 min', hasVideo:true, hasQuiz:true },
        ]
    },
    {
        id:6, num:'Module 6', title:'Promotion & SEO', emoji:'📈',
        color:'rgba(0,200,81,0.12)', border:'rgba(0,200,81,0.25)',
        duration:'2 hours', lessons:6,
        desc:'Get traffic to your website using SEO, social media, and community marketing — all for free.',
        lessonList:[
            { id:'6.1', title:'What is SEO? Simple Guide', dur:'14 min', hasVideo:true, hasQuiz:true },
            { id:'6.2', title:'Keyword Research for Free', dur:'18 min', hasVideo:true, hasQuiz:true },
            { id:'6.3', title:'Writing SEO Content with AI', dur:'20 min', hasVideo:true, hasQuiz:false },
            { id:'6.4', title:'Social Media Promotion', dur:'15 min', hasVideo:true, hasQuiz:false },
            { id:'6.5', title:'Reddit and Community Marketing', dur:'12 min', hasVideo:false, hasQuiz:true },
            { id:'6.6', title:'Getting Your First 1,000 Visitors', dur:'15 min', hasVideo:true, hasQuiz:true },
        ]
    },
    {
        id:7, num:'Module 7', title:'Make Money Online', emoji:'💰',
        color:'rgba(255,184,0,0.12)', border:'rgba(255,184,0,0.3)',
        duration:'2 hours', lessons:6,
        desc:'Turn your website into an income stream — from AdSense to affiliate marketing and digital products.',
        lessonList:[
            { id:'7.1', title:'Google AdSense Complete Guide', dur:'20 min', hasVideo:true, hasQuiz:true },
            { id:'7.2', title:'Affiliate Marketing Basics', dur:'18 min', hasVideo:true, hasQuiz:true },
            { id:'7.3', title:'Selling Digital Products', dur:'16 min', hasVideo:true, hasQuiz:false },
            { id:'7.4', title:'Offering Services Online', dur:'14 min', hasVideo:true, hasQuiz:false },
            { id:'7.5', title:'Building Your Email List', dur:'15 min', hasVideo:false, hasQuiz:true },
            { id:'7.6', title:'Scaling to $1,000/Month', dur:'17 min', hasVideo:true, hasQuiz:true },
        ]
    },
    {
        id:'B', num:'Bonus Module', title:'AI Tools Mastery', emoji:'🎁',
        color:'rgba(255,184,0,0.1)', border:'rgba(255,184,0,0.3)',
        duration:'1.5 hours', lessons:4, isBonus:true,
        desc:'Master the essential AI tools that every website builder and online entrepreneur needs in 2025.',
        lessonList:[
            { id:'B.1', title:'ChatGPT Complete Tutorial for Beginners', dur:'25 min', hasVideo:true, hasQuiz:true },
            { id:'B.2', title:'Midjourney for Beginners', dur:'20 min', hasVideo:true, hasQuiz:true },
            { id:'B.3', title:'Automating Your Business with Zapier', dur:'18 min', hasVideo:true, hasQuiz:false },
            { id:'B.4', title:'Best Free AI Tools List 2025', dur:'12 min', hasVideo:false, hasQuiz:false },
        ]
    }
];

// Lesson content data
const lessonContent = {
    takeaways: {
        '1.1': ['A domain name is your website address (e.g. mysite.com)','Domain names are leased annually, not purchased permanently','Choose .com for business credibility when possible','Shorter domains are easier to remember and type'],
        '1.2': ['Keep domain names short, memorable and easy to spell','Avoid hyphens, numbers and tricky spellings','Match your domain to your brand or main keyword','Use a domain name generator if you are stuck'],
        '3.2': ['ChatGPT can generate full HTML/CSS websites in seconds','Use specific prompts for better results','Always review and test AI-generated code','You can iterate with follow-up prompts to improve'],
        default: ['This lesson teaches core web building concepts','Apply these skills immediately to your project','Revisit this lesson if you get stuck later','Each lesson builds on the previous one']
    },
    quizzes: {
        '1.1': {
            q: 'What is a domain name?',
            opts: ['The server where your files are stored','Your website address (e.g. mysite.com)','The design template of your website','Your hosting provider'],
            correct: 1
        },
        '1.2': {
            q: 'Which of these is the BEST domain name?',
            opts: ['my-super-awesome-website-2025.com','mybrand.com','www123456.net','mySuperBrand-online.biz'],
            correct: 1
        },
        default: {
            q: 'What is the main goal of this lesson?',
            opts: ['To confuse beginners','To teach you one core web building skill','To sell you expensive software','To replace professional developers'],
            correct: 1
        }
    }
};

// =============================================
// STATE
// =============================================
let completedLessons = new Set();
let isEnrolled = false;
let currentLesson = null;
let openModules = new Set([1]); // Module 1 open by default

// =============================================
// RENDER MODULES
// =============================================
window.renderModules = function() {
    const container = document.getElementById('modulesList');
    const quickJump = document.getElementById('quickJump');
    if(!container || !quickJump) return;

    container.innerHTML = modules.map(mod => {
        const completedInMod = mod.lessonList.filter(l => completedLessons.has(l.id)).length;
        const total = mod.lessonList.length;
        const pct = total > 0 ? Math.round((completedInMod/total)*100) : 0;
        const isOpen = openModules.has(mod.id);

        let completionClass = 'not-started';
        let completionLabel = 'Not Started';
        if (pct === 100) { completionClass = 'completed'; completionLabel = '✓ Complete'; }
        else if (pct > 0) { completionClass = 'in-progress'; completionLabel = `${pct}% Done`; }

        return `
        <div class="module-card ${mod.isBonus ? 'bonus' : ''} ${isOpen ? 'open' : ''}" id="mod-${mod.id}">
            <div class="module-header" onclick="toggleModule('${mod.id}')">
                <div class="module-icon" style="background:${mod.color};border-color:${mod.border};">
                    ${mod.emoji}
                </div>
                <div class="module-info">
                    <div class="module-num">${mod.num} ${mod.isBonus ? '🎁' : ''}</div>
                    <div class="module-title">
                        ${mod.title}
                        ${mod.isBonus ? '<span style="background:rgba(255,184,0,0.15);border:1px solid rgba(255,184,0,0.3);color:var(--yellow);padding:2px 9px;border-radius:100px;font-size:0.7rem;font-weight:700;">BONUS</span>' : ''}
                    </div>
                    <div class="module-meta">
                        <span class="meta-item">📖 ${mod.lessons} lessons</span>
                        <span class="meta-item">⏱️ ${mod.duration}</span>
                        ${completedInMod > 0 ? `<span class="meta-item" style="color:var(--green);">✓ ${completedInMod}/${total} done</span>` : ''}
                    </div>
                </div>
                <div class="module-right">
                    <span class="mod-completion ${completionClass}">${completionLabel}</span>
                    <span class="chevron">▼</span>
                </div>
            </div>

            <div class="module-body">
                <div class="module-body-inner">
                    <!-- Module progress mini bar -->
                    <div style="padding:12px 22px;border-bottom:1px solid var(--border-s);">
                        <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                            <span style="font-size:0.74rem;color:var(--dim);">${mod.desc}</span>
                        </div>
                        <div style="height:4px;background:rgba(255,255,255,0.05);border-radius:4px;overflow:hidden;margin-top:8px;">
                            <div style="height:100%;width:${pct}%;background:${pct===100?'var(--green)':'var(--primary)'};border-radius:4px;transition:width 0.4s ease;"></div>
                        </div>
                    </div>
                    <div class="lesson-list">
                        ${mod.lessonList.map((lesson, idx) => {
                            const isDone = completedLessons.has(lesson.id);
                            const isActive = currentLesson && currentLesson.id === lesson.id;
                            return `
                            <div class="lesson-item ${isDone ? 'completed-lesson' : ''} ${isActive ? 'active-lesson' : ''}"
                                 onclick="openLesson('${lesson.id}', '${mod.id}')">
                                <div class="lesson-num">${lesson.id}</div>
                                <div class="lesson-info">
                                    <div class="lesson-title">
                                        ${lesson.title}
                                    </div>
                                    <div class="lesson-meta-row">
                                        ${lesson.hasVideo ? '<span class="lesson-tag tag-video">▶ Video</span>' : ''}
                                        <span class="lesson-tag tag-article">📄 Article</span>
                                        ${lesson.hasQuiz ? '<span class="lesson-tag tag-quiz">❓ Quiz</span>' : ''}
                                        <span class="lesson-dur">⏱️ ${lesson.dur}</span>
                                    </div>
                                </div>
                                <div class="lesson-right">
                                    <span class="check-icon">✅</span>
                                    <div class="play-btn">▶</div>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    // Quick Jump sidebar
    quickJump.innerHTML = modules.map(mod => `
        <button onclick="scrollToModule('${mod.id}')" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--rs);background:none;border:none;color:var(--muted);cursor:pointer;transition:var(--ease);text-align:left;font-family:var(--fh);font-weight:500;font-size:0.82rem;width:100%;">
            <span>${mod.emoji}</span> ${mod.num}: ${mod.title}
        </button>
    `).join('');

    renderProgressBadges();
}

// =============================================
// ACTIONS
// =============================================
window.toggleModule = function(id) {
    const card = document.getElementById(`mod-${id}`);
    if (openModules.has(id) || openModules.has(parseInt(id))) {
        openModules.delete(id);
        openModules.delete(parseInt(id));
        card.classList.remove('open');
    } else {
        openModules.add(id);
        card.classList.add('open');
    }
}

window.scrollToModule = function(id) {
    const el = document.getElementById(`mod-${id}`);
    if (el) {
        el.scrollIntoView({behavior:'smooth', block:'start'});
        if (!openModules.has(id)) {
            openModules.add(id);
            el.classList.add('open');
        }
    }
}

window.openLesson = function(lessonId, modId) {
    const mod = modules.find(m => m.id == modId);
    const lesson = mod.lessonList.find(l => l.id === lessonId);
    currentLesson = lesson;

    const viewer = document.getElementById('lessonViewer');
    viewer.classList.add('open');
    document.getElementById('viewerMeta').textContent = `${mod.num} · Lesson ${lessonId}`;
    document.getElementById('viewerTitle').textContent = lesson.title;

    const takeaways = lessonContent.takeaways[lessonId] || lessonContent.takeaways.default;
    const isDone = completedLessons.has(lessonId);

    // Find next lesson
    const allLessons = modules.flatMap(m => m.lessonList.map(l => ({...l, modId:m.id})));
    const curIdx = allLessons.findIndex(l => l.id === lessonId);
    const nextLesson = allLessons[curIdx + 1];

    document.getElementById('viewerBody').innerHTML = `
        <!-- Video -->
        ${lesson.hasVideo ? `
        <div class="video-placeholder" onclick="showToast('Video player loading... Enroll to watch full video!','▶')">
            <div class="video-placeholder-bg"></div>
            <div class="play-overlay">▶</div>
            <div class="video-label">📹 ${lesson.title}</div>
            <div class="video-sublabel">Duration: ${lesson.dur} · Click to play</div>
        </div>` : ''}

        <!-- Article -->
        <div style="background:var(--surface);border-radius:var(--r);padding:18px 20px;margin-bottom:16px;font-size:0.88rem;color:var(--muted);line-height:1.7;">
            <div style="font-family:var(--fh);font-weight:700;font-size:0.9rem;color:var(--text);margin-bottom:10px;display:flex;align-items:center;gap:7px;">
                📄 Written Guide: ${lesson.title}
            </div>
            <p>This lesson covers everything you need to know about <strong style="color:var(--text);">${lesson.title.toLowerCase()}</strong>. Follow along with the video above or read this written version at your own pace.</p>
            <br>
            <p>In this section, you will learn the core concepts step by step, with real examples and actionable tips you can apply immediately to your project. Take notes on the key points and complete the quiz at the end to reinforce your learning.</p>
            <br>
            <p style="color:var(--dim);font-size:0.82rem;">📖 Full article content available after enrolling — it's 100% free!</p>
        </div>

        <!-- Key Takeaways -->
        <div class="takeaways-box">
            <div class="takeaways-title">💡 Key Takeaways</div>
            ${takeaways.map(t => `<div class="takeaway-item"><span class="tk-dot">◆</span><span>${t}</span></div>`).join('')}
        </div>

        <!-- Quiz -->
        ${lesson.hasQuiz ? renderQuiz(lessonId) : ''}

        <!-- Actions -->
        <div class="viewer-actions">
            <button class="mark-complete-btn ${isDone?'marked':''}" id="markBtn-${lessonId}"
                onclick="markComplete('${lessonId}', '${modId}')">
                ${isDone ? '✅ Completed!' : '○ Mark as Complete'}
            </button>
            <button class="dl-btn" onclick="downloadResource('${lesson.title} — Notes PDF')">
                📄 Download Notes
            </button>
            ${nextLesson ? `
            <button class="btn btn-primary btn-sm next-lesson-btn"
                onclick="openLesson('${nextLesson.id}', '${nextLesson.modId}')">
                Next: ${nextLesson.title.substring(0,25)}... →
            </button>` : `<div class="btn btn-green btn-sm next-lesson-btn" style="cursor:default;">🎉 Module Complete!</div>`}
        </div>`;

    viewer.scrollIntoView({behavior:'smooth', block:'start'});
    window.renderModules();
}

function renderQuiz(lessonId) {
    const quiz = lessonContent.quizzes[lessonId] || lessonContent.quizzes.default;
    return `
    <div class="quiz-box" id="quizBox-${lessonId}">
        <div class="quiz-title">❓ Quick Quiz — Test Your Knowledge</div>
        <div class="quiz-q">${quiz.q}</div>
        <div class="quiz-options" id="opts-${lessonId}">
            ${quiz.opts.map((opt, i) => `
                <div class="quiz-opt" onclick="selectOpt(this,'${lessonId}',${i},${quiz.correct})" data-idx="${i}">
                    <div class="quiz-opt-dot">${String.fromCharCode(65+i)}</div>
                    <span>${opt}</span>
                </div>
            `).join('')}
        </div>
        <div id="quiz-result-${lessonId}" style="display:none;font-family:var(--fh);font-size:0.82rem;padding:8px 12px;border-radius:var(--rs);"></div>
    </div>`;
}

window.selectOpt = function(el, lessonId, idx, correct) {
    const opts = document.querySelectorAll(`#opts-${lessonId} .quiz-opt`);
    opts.forEach(o => { o.classList.remove('selected','correct','wrong'); o.onclick = null; });

    const resultEl = document.getElementById(`quiz-result-${lessonId}`);
    resultEl.style.display = 'block';

    if (idx === correct) {
        el.classList.add('correct');
        resultEl.style.background = 'rgba(0,200,81,0.1)';
        resultEl.style.border = '1px solid rgba(0,200,81,0.3)';
        resultEl.style.color = 'var(--green)';
        resultEl.textContent = '✅ Correct! Great job!';
    } else {
        el.classList.add('wrong');
        opts[correct].classList.add('correct');
        resultEl.style.background = 'rgba(255,68,68,0.1)';
        resultEl.style.border = '1px solid rgba(255,68,68,0.3)';
        resultEl.style.color = 'var(--red)';
        resultEl.textContent = `❌ Not quite. The correct answer is: ${opts[correct].querySelector('span').textContent}`;
    }
}

window.closeViewer = function() {
    document.getElementById('lessonViewer').classList.remove('open');
    currentLesson = null;
    window.renderModules();
}

window.markComplete = function(lessonId, modId) {
    if (!isEnrolled) { window.openEnrollModal(); return; }

    if (completedLessons.has(lessonId)) {
        completedLessons.delete(lessonId);
        showToast('Lesson unmarked','↩️');
    } else {
        completedLessons.add(lessonId);
        showToast('Lesson completed! 🎉','✅');
    }

    const btn = document.getElementById(`markBtn-${lessonId}`);
    if (btn) {
        const isDone = completedLessons.has(lessonId);
        btn.textContent = isDone ? '✅ Completed!' : '○ Mark as Complete';
        btn.classList.toggle('marked', isDone);
    }

    updateProgress();
    window.renderModules();
}

function updateProgress() {
    const totalLessons = modules.reduce((s,m) => s + m.lessonList.length, 0);
    const done = completedLessons.size;
    const pct = Math.round((done / totalLessons) * 100);

    const progressBar = document.getElementById('progressBar');
    const progressPct = document.getElementById('progressPct');
    const progressMsg = document.getElementById('progressMsg');
    const contBtn = document.getElementById('continueBtn');

    if(progressBar) progressBar.style.width = pct + '%';
    if(progressPct) progressPct.textContent = pct + '% Complete';
    if(progressMsg) {
        if(done > 0) progressMsg.textContent = `✅ ${done} of ${totalLessons} lessons completed — keep going!`;
    }
    if(contBtn && done > 0) contBtn.style.display = 'flex';

    renderProgressBadges();
}

function renderProgressBadges() {
    const container = document.getElementById('modBadges');
    if(!container) return;
    container.innerHTML = modules.map(mod => {
        const done = mod.lessonList.filter(l => completedLessons.has(l.id)).length;
        const total = mod.lessonList.length;
        const pct = Math.round((done/total)*100);
        let cls = 'mod-badge';
        if (pct === 100) cls += ' done';
        else if (pct > 0) cls += ' active-mod';

        return `<span class="${cls}" title="${mod.num}: ${done}/${total} lessons done">
            ${mod.emoji} ${pct === 100 ? '✓' : (pct > 0 ? `${pct}%` : '—')}
        </span>`;
    }).join('');
}

window.continueLearning = function() {
    const allLessons = modules.flatMap(m => m.lessonList.map(l => ({...l, modId:m.id})));
    const nextIncomplete = allLessons.find(l => !completedLessons.has(l.id));
    if (nextIncomplete) {
        window.openLesson(nextIncomplete.id, nextIncomplete.modId);
        if (!openModules.has(nextIncomplete.modId)) {
            openModules.add(nextIncomplete.modId);
        }
        window.renderModules();
    }
}

// =============================================
// ENROLL / CERT
// =============================================
window.openEnrollModal = function() {
    document.getElementById('enrollModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

window.closeEnrollModal = function() {
    document.getElementById('enrollModal').classList.remove('open');
    document.body.style.overflow = '';
}

window.handleEnroll = function(e) {
    e.preventDefault();
    isEnrolled = true;
    window.closeEnrollModal();
    const badge = document.getElementById('enrolledBadge');
    const msg = document.getElementById('progressMsg');
    const btn = document.getElementById('continueBtn');

    if(badge) badge.style.display = 'inline-flex';
    if(msg) msg.textContent = '🎉 Welcome! Click any lesson to start learning.';
    if(btn) btn.style.display = 'flex';

    showToast(`Welcome! You are enrolled 🎓`,'🎉');
}

window.updateCertPreview = function() {
    const name = document.getElementById('certName').value.trim();
    const preview = document.getElementById('certPreview');
    const nameEl = document.getElementById('certPreviewName');
    if (name.length > 0) {
        if(preview) preview.classList.add('show');
        if(nameEl) nameEl.textContent = name;
    } else {
        if(preview) preview.classList.remove('show');
    }
}

window.generateCert = function() {
    const name = document.getElementById('certName').value.trim();
    if (!name) { showToast('Please enter your full name','⚠️'); return; }
    if (!isEnrolled) { window.openEnrollModal(); return; }

    showToast('Certificate generated! 🏆','🎓');
    document.getElementById('dlCertBtn').style.display = 'flex';
    document.getElementById('linkedinBtn').style.display = 'flex';
}

window.downloadResource = function(name) {
    showToast(`Downloading: ${name}...`,'📥');
}

// =============================================
// UTILS
// =============================================
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
if(ham && mobileNav) {
    ham.addEventListener('click', () => { ham.classList.toggle('active'); mobileNav.classList.toggle('open'); });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('active'); mobileNav.classList.remove('open'); }));
}

window.addEventListener('scroll', () => {
    const st = document.getElementById('scrollTop');
    if(st) st.classList.toggle('vis', window.scrollY > 400);
});

let toastT;
function showToast(msg, icon='✅') {
    clearTimeout(toastT);
    const t = document.getElementById('toast');
    const m = document.getElementById('toastMsg');
    const i = document.getElementById('toastIcon');
    if(!t || !m || !i) return;

    m.textContent = msg;
    i.textContent = icon;
    t.classList.add('show');
    toastT = setTimeout(() => t.classList.remove('show'), 3200);
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    window.renderModules();
    updateProgress();
});

console.log('%c📚 SanzyAI Free Learning Hub Loaded','color:#00C851;font-weight:bold;font-size:16px;');
