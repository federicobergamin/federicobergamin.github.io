const WeatherService = {
    // Initialize the weather service
    init: function(forceLocation = true) {
        if (forceLocation) {
            // Use the predefined location
            const location = this.getPreferredLocation();
            this.getWeather(location.latitude, location.longitude, location.cityName);
            
            // Update weather every 30 minutes
            setInterval(() => {
                const location = this.getPreferredLocation();
                this.getWeather(location.latitude, location.longitude, location.cityName);
            }, 1800000);
        } else {
            // Use user's geolocation (original behavior)
            this.getUserLocation();
            setInterval(() => this.getUserLocation(), 1800000);
        }
    },

    // Get weather data using Open-Meteo API
    getWeather: async function(latitude, longitude, cityName) {
        // Updated API URL to include daily sunrise and sunset, and is_day flag
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day&daily=sunrise,sunset&timezone=auto`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Get current weather data
            const currentTemp = Math.round(data.current.temperature_2m);
            const weatherCode = data.current.weather_code;
            const isDay = data.current.is_day; // 1 for day, 0 for night
            
            // Update the weather information
            document.getElementById('temperature').textContent = `${currentTemp}°`;
            
            // Get weather condition and icon based on WMO weather code AND day/night state
            const weatherInfo = this.getWeatherCondition(weatherCode, isDay);
            document.getElementById('condition').textContent = weatherInfo.condition;
            document.getElementById('weather-icon').textContent = weatherInfo.icon;
            
            // Update location
            document.getElementById('location').textContent = cityName;
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            document.getElementById('temperature').textContent = '--°';
            document.getElementById('condition').textContent = 'ERROR';
            document.getElementById('weather-icon').textContent = '!';
        }
    },
    
    // Convert WMO weather codes to conditions and icons, considering day/night
    getWeatherCondition: function(code, isDay) {
        // Basic conditions with day/night variations
        const dayConditions = {
            0: { condition: 'CLEAR', icon: '☀️' },               // Clear sky (day)
            1: { condition: 'MAINLY CLEAR', icon: '🌤️' },        // Mainly clear (day)
            2: { condition: 'PARTLY CLOUDY', icon: '⛅' },        // Partly cloudy (day)
            3: { condition: 'OVERCAST', icon: '☁️' },            // Overcast
            45: { condition: 'FOG', icon: '🌫️' },                // Fog
            48: { condition: 'FROST FOG', icon: '🌫️' },          // Depositing rime fog
            51: { condition: 'LIGHT DRIZZLE', icon: '🌦️' },      // Light drizzle (day)
            53: { condition: 'DRIZZLE', icon: '🌦️' },            // Moderate drizzle (day)
            55: { condition: 'HEAVY DRIZZLE', icon: '🌧️' },      // Dense drizzle
            56: { condition: 'FREEZING DRIZZLE', icon: '🌨️' },   // Light freezing drizzle
            57: { condition: 'FREEZING DRIZZLE', icon: '🌨️' },   // Dense freezing drizzle
            61: { condition: 'LIGHT RAIN', icon: '🌦️' },         // Slight rain (day)
            63: { condition: 'RAIN', icon: '🌧️' },               // Moderate rain
            65: { condition: 'HEAVY RAIN', icon: '🌧️' },         // Heavy rain
            66: { condition: 'FREEZING RAIN', icon: '🌨️' },      // Light freezing rain
            67: { condition: 'FREEZING RAIN', icon: '🌨️' },      // Heavy freezing rain
            71: { condition: 'LIGHT SNOW', icon: '🌨️' },         // Slight snow fall
            73: { condition: 'SNOW', icon: '❄️' },               // Moderate snow fall
            75: { condition: 'HEAVY SNOW', icon: '❄️' },         // Heavy snow fall
            77: { condition: 'SNOW GRAINS', icon: '❄️' },        // Snow grains
            80: { condition: 'LIGHT SHOWERS', icon: '🌦️' },      // Slight rain showers (day)
            81: { condition: 'SHOWERS', icon: '🌧️' },            // Moderate rain showers
            82: { condition: 'HEAVY SHOWERS', icon: '🌧️' },      // Violent rain showers
            85: { condition: 'SNOW SHOWERS', icon: '🌨️' },       // Slight snow showers
            86: { condition: 'SNOW SHOWERS', icon: '❄️' },       // Heavy snow showers
            95: { condition: 'THUNDERSTORM', icon: '⛈️' },       // Thunderstorm
            96: { condition: 'HAIL THUNDERSTORM', icon: '⛈️' },  // Thunderstorm with slight hail
            99: { condition: 'HAIL THUNDERSTORM', icon: '⛈️' }   // Thunderstorm with heavy hail
        };
        
        const nightConditions = {
            0: { condition: 'CLEAR', icon: '🌙' },               // Clear sky (night)
            1: { condition: 'MAINLY CLEAR', icon: '🌙' },        // Mainly clear (night)
            2: { condition: 'PARTLY CLOUDY', icon: '☁️🌙' },     // Partly cloudy (night)
            3: { condition: 'OVERCAST', icon: '☁️' },            // Overcast (same day or night)
            45: { condition: 'FOG', icon: '🌫️' },                // Fog (same day or night)
            48: { condition: 'FROST FOG', icon: '🌫️' },          // Depositing rime fog (same)
            51: { condition: 'LIGHT DRIZZLE', icon: '🌙🌧️' },    // Light drizzle (night)
            53: { condition: 'DRIZZLE', icon: '🌙🌧️' },          // Moderate drizzle (night)
            55: { condition: 'HEAVY DRIZZLE', icon: '🌧️' },      // Dense drizzle (same)
            56: { condition: 'FREEZING DRIZZLE', icon: '🌨️' },   // Light freezing drizzle (same)
            57: { condition: 'FREEZING DRIZZLE', icon: '🌨️' },   // Dense freezing drizzle (same)
            61: { condition: 'LIGHT RAIN', icon: '🌙🌧️' },       // Slight rain (night)
            63: { condition: 'RAIN', icon: '🌧️' },               // Moderate rain (same)
            65: { condition: 'HEAVY RAIN', icon: '🌧️' },         // Heavy rain (same)
            66: { condition: 'FREEZING RAIN', icon: '🌨️' },      // Light freezing rain (same)
            67: { condition: 'FREEZING RAIN', icon: '🌨️' },      // Heavy freezing rain (same)
            71: { condition: 'LIGHT SNOW', icon: '🌙❄️' },       // Slight snow fall (night)
            73: { condition: 'SNOW', icon: '❄️' },               // Moderate snow fall (same)
            75: { condition: 'HEAVY SNOW', icon: '❄️' },         // Heavy snow fall (same)
            77: { condition: 'SNOW GRAINS', icon: '❄️' },        // Snow grains (same)
            80: { condition: 'LIGHT SHOWERS', icon: '🌙🌧️' },    // Slight rain showers (night)
            81: { condition: 'SHOWERS', icon: '🌧️' },            // Moderate rain showers (same)
            82: { condition: 'HEAVY SHOWERS', icon: '🌧️' },      // Violent rain showers (same)
            85: { condition: 'SNOW SHOWERS', icon: '🌙❄️' },     // Slight snow showers (night)
            86: { condition: 'SNOW SHOWERS', icon: '❄️' },       // Heavy snow showers (same)
            95: { condition: 'THUNDERSTORM', icon: '⛈️' },       // Thunderstorm (same)
            96: { condition: 'HAIL THUNDERSTORM', icon: '⛈️' },  // Thunderstorm with slight hail (same)
            99: { condition: 'HAIL THUNDERSTORM', icon: '⛈️' }   // Thunderstorm with heavy hail (same)
        };
        
        // Choose between day and night conditions based on isDay flag
        const conditions = isDay === 1 ? dayConditions : nightConditions;
        
        return conditions[code] || { condition: 'UNKNOWN', icon: isDay === 1 ? '↑' : '🌙' };
    },
    
    // Get your preferred location
    getPreferredLocation: function() {
        // MODIFY THIS FUNCTION to set your specific location
        // Here are some example locations:
        
        return {
            latitude: 55.67594,
            longitude: 12.56553,
            cityName: 'COPENHAGEN (DK)'
        };

        
    },
    
    // Get user's location (only called if not forcing location)
    getUserLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.getWeather(latitude, longitude, 'CURRENT LOCATION');
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    const defaultLocation = this.getPreferredLocation();
                    this.getWeather(defaultLocation.latitude, defaultLocation.longitude, defaultLocation.cityName);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            const defaultLocation = this.getPreferredLocation();
            this.getWeather(defaultLocation.latitude, defaultLocation.longitude, defaultLocation.cityName);
        }
    }
};