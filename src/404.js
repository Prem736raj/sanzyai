// Customize Sanzy's message for the 404 page
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if(window.SanzyBot) {
            window.SanzyBot.pageMessages['home'] = "Oops! Seems like you hit a dead end (404 Error). Don't worry, I know all the links! What are you trying to find?";
            // Auto open the bot heavily suggesting help
            if(!window.SanzyBot.isOpen) window.SanzyBot.open();
        }
    }, 3500);
});
