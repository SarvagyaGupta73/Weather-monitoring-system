const WeatherCard = require('./components/WeatherCard');
const DailySummaryTable = require('./components/DailySummaryTable');
const AlertForm = require('./components/AlertForm');
const config = require('../config/config');

class DashboardView {
    static render({ currentWeather, dailySummaries, thresholds }) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Weather Monitoring Dashboard</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Weather Monitoring Dashboard</h1>
                    
                    <!-- Weather Cards -->
                    <div class="cards-container">
                        ${currentWeather.map(weather => {
                            const threshold = thresholds.find(t => t.cityId === weather.cityId);
                            return WeatherCard.render(weather, threshold);
                        }).join('')}
                    </div>

                    <!-- Daily Summary Table -->
                    ${DailySummaryTable.render(dailySummaries)}

                    <!-- Alert Form -->
                    ${AlertForm.render(currentWeather)}

                    <!-- Active Alerts -->
                    <div class="active-alerts">
                        ${currentWeather.map(weather => {
                            const threshold = thresholds.find(t => t.cityId === weather.cityId);
                            if (threshold && weather.temp > threshold.tempThreshold) {
                                return `
                                    <div class="alert-item">
                                        <strong>${weather.cityName}:</strong> 
                                        Current temperature ${weather.temp.toFixed(1)}°C 
                                        exceeds threshold ${threshold.tempThreshold}°C
                                        <br>
                                        <small>Alerts will be sent to: ${threshold.email}</small>
                                    </div>
                                `;
                            }
                            return '';
                        }).join('')}
                    </div>

                    <!-- Visualization Button -->
                    <div class="button-container">
                        <a href="/visualizations" class="viz-button">
                            📊 View Weather Visualizations
                        </a>
                    </div>
                </div>

                <script>
                    setTimeout(() => {
                        window.location.reload();
                    }, ${config.UPDATE_INTERVAL});
                </script>
            </body>
            </html>
        `;
    }
}

module.exports = DashboardView;