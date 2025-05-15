// Theme Service - Handles day/night theming based on user's local time
const ThemeService = {
    // Initialize the theme service
    init: function() {
        this.updateThemeBasedOnLocalTime();
        // Check every 5 minutes if we need to switch themes
        setInterval(() => this.updateThemeBasedOnLocalTime(), 300000);
    },

    // Update theme based on user's local time
    updateThemeBasedOnLocalTime: function() {
        const now = new Date();
        const hour = now.getHours();
        
        // Consider daytime between 6 AM and 6 PM (18:00)
        const isDaytime = hour >= 6 && hour < 18;
        
        this.applyTheme(isDaytime);
    },
    
    // Apply the appropriate theme
    applyTheme: function(isDaytime) {
        const body = document.body;
        const statusBar = document.querySelector('.status-bar');
        
        if (isDaytime) {
            // Day theme: black text on white background
            body.classList.remove('night-mode');
            body.classList.add('day-mode');
            console.log('Applied day theme based on user local time');
        } else {
            // Night theme: white text on dark background
            body.classList.remove('day-mode');
            body.classList.add('night-mode');
            console.log('Applied night theme based on user local time');
        }
    }
};
