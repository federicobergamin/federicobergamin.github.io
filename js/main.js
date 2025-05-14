// Main application code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all services
    TimeService.init();
    
    // Initialize WeatherService with forced location
    // Set to true to force the preferred location
    // Set to false to attempt to use user's location
    WeatherService.init(true);
    
    console.log('Weather & Time display initialized with fixed location');
});