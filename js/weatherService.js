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
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            // Get current weather data
            const currentTemp = Math.round(data.current.temperature_2m);
            const weatherCode = data.current.weather_code;
            
            // Update the weather information
            document.getElementById('temperature').textContent = `${currentTemp}°`;
            
            // Get weather condition and icon based on WMO weather code
            const weatherInfo = this.getWeatherCondition(weatherCode);
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
    
    // Convert WMO weather codes to conditions and icons
    getWeatherCondition: function(code) {
        // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
        const conditions = {
            0: { condition: 'CLEAR', icon: '☀️' },               // Clear sky
            1: { condition: 'MAINLY CLEAR', icon: '🌤️' },        // Mainly clear
            2: { condition: 'PARTLY CLOUDY', icon: '⛅' },        // Partly cloudy
            3: { condition: 'OVERCAST', icon: '☁️' },            // Overcast
            45: { condition: 'FOG', icon: '🌫️' },                // Fog
            48: { condition: 'FROST FOG', icon: '🌫️' },          // Depositing rime fog
            51: { condition: 'LIGHT DRIZZLE', icon: '🌦️' },      // Light drizzle
            53: { condition: 'DRIZZLE', icon: '🌦️' },            // Moderate drizzle
            55: { condition: 'HEAVY DRIZZLE', icon: '🌧️' },      // Dense drizzle
            56: { condition: 'FREEZING DRIZZLE', icon: '🌨️' },   // Light freezing drizzle
            57: { condition: 'FREEZING DRIZZLE', icon: '🌨️' },   // Dense freezing drizzle
            61: { condition: 'LIGHT RAIN', icon: '🌦️' },         // Slight rain
            63: { condition: 'RAIN', icon: '🌧️' },               // Moderate rain
            65: { condition: 'HEAVY RAIN', icon: '🌧️' },         // Heavy rain
            66: { condition: 'FREEZING RAIN', icon: '🌨️' },      // Light freezing rain
            67: { condition: 'FREEZING RAIN', icon: '🌨️' },      // Heavy freezing rain
            71: { condition: 'LIGHT SNOW', icon: '🌨️' },         // Slight snow fall
            73: { condition: 'SNOW', icon: '❄️' },               // Moderate snow fall
            75: { condition: 'HEAVY SNOW', icon: '❄️' },         // Heavy snow fall
            77: { condition: 'SNOW GRAINS', icon: '❄️' },        // Snow grains
            80: { condition: 'LIGHT SHOWERS', icon: '🌦️' },      // Slight rain showers
            81: { condition: 'SHOWERS', icon: '🌧️' },            // Moderate rain showers
            82: { condition: 'HEAVY SHOWERS', icon: '🌧️' },      // Violent rain showers
            85: { condition: 'SNOW SHOWERS', icon: '🌨️' },       // Slight snow showers
            86: { condition: 'SNOW SHOWERS', icon: '❄️' },       // Heavy snow showers
            95: { condition: 'THUNDERSTORM', icon: '⛈️' },       // Thunderstorm
            96: { condition: 'HAIL THUNDERSTORM', icon: '⛈️' },  // Thunderstorm with slight hail
            99: { condition: 'HAIL THUNDERSTORM', icon: '⛈️' }   // Thunderstorm with heavy hail
        };

        return conditions[code] || { condition: 'UNKNOWN', icon: '↑' };
    },
    
    // Get your preferred location
    getPreferredLocation: function() {
        // MODIFY THIS FUNCTION to set your specific location
        // Here are some example locations:
        
        // Bergamo, Italy
        return {
            latitude: 55.67594,
            longitude: 12.56553,
            cityName: 'COPENHAGEN (DK)'
        };
        
        /* New York City, USA
        return {
            latitude: 40.7128,
            longitude: -74.0060,
            cityName: 'NEW YORK (NY) US'
        };
        */
        
        /* Tokyo, Japan
        return {
            latitude: 35.6762,
            longitude: 139.6503,
            cityName: 'TOKYO (TKY) JP'
        };
        */
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