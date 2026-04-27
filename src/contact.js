// Contact Form Interception
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value.trim();
        
        const subjectMap = {
            general: 'General Question',
            support: 'Product Support',
            refund: 'Refund Request',
            services: 'AI Services Inquiry',
            partnership: 'Partnership / Collaboration',
            bug: 'Bug Report'
        };
        
        const mailSubject = encodeURIComponent('[SanzyAI] ' + (subjectMap[subject] || 'Contact'));
        const mailBody = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Subject: ' + (subjectMap[subject] || subject) + '\n\n' +
            message
        );
        
        window.open('mailto:hello@sanzyai.com?subject=' + mailSubject + '&body=' + mailBody);
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '✓ Opening email client...';
        btn.style.background = 'linear-gradient(135deg, #00FF88, #00C870)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// Open Chat Assistant Button
const openChatBtn = document.getElementById('openChatAssistantInfoBtn');
if (openChatBtn) {
    openChatBtn.addEventListener('click', () => {
        const chatToggle = document.querySelector('.sanzy-chat-toggle');
        if (chatToggle) {
            chatToggle.click();
        }
    });
}
