class WeatherCard {
    static render(weather, threshold) {
        return `
            <div class="card">
                <h3>${weather.cityName}</h3>
                <div class="weather-info">
                    <span>Weather</span>
                    <span class="weather-badge">${weather.main}</span>
                </div>
                <div class="weather-info">
                    <span>Temperature</span>
                    <span>${weather.temp.toFixed(1)}°C</span>
                </div>
                <div class="weather-info">
                    <span>Feels Like</span>
                    <span>${weather.feels_like.toFixed(1)}°C</span>        
                </div>
                ${threshold ? `
                    <div class="weather-info">
                        <span>Alert Threshold</span>
                        <span>${threshold.tempThreshold}°C</span>
                    </div>
                ` : ''}
                <div style="font-size: 0.8em; color: #666; text-align: right; margin-top: 15px;">
                    Updated: ${weather.timestamp.toLocaleString()}
                </div>
            </div>
        `;
    }
}

module.exports = WeatherCard;