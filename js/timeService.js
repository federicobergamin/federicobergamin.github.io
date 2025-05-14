// Time Service
const TimeService = {
    // Initialize the time service
    init: function() {
        this.updateTime();
        // Update time every minute
        setInterval(() => this.updateTime(), 60000);
    },

    // Update the time display
    updateTime: function() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        document.getElementById('time').textContent = `${hours}:${minutes}`;
    }
};