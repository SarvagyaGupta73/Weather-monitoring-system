class VisualizationsView {
    static render({ currentWeather, dailySummaries }) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Weather Visualizations</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/css/styles.css">
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <script src="/js/charts.js" defer></script>
            </head>
            <body>
                <div class="container">
                    <a href="/" class="back-btn">← Back to Dashboard</a>
                    <h1>Weather Visualizations</h1>

                    <!-- Temperature Trends -->
                    <div class="chart-container">
                        <h2>Temperature Trends</h2>
                        <div class="chart-wrapper">
                            <canvas id="trendsChart"></canvas>
                        </div>
                    </div>

                    <div class="grid">
                        <!-- Temperature Range Chart -->
                        <div class="chart-container">
                            <h2>Temperature Ranges by City</h2>
                            <div class="chart-wrapper">
                                <canvas id="rangeChart"></canvas>
                            </div>
                        </div>

                        <!-- Weather Distribution Chart -->
                        <div class="chart-container">
                            <h2>Weather Distribution</h2>
                            <div class="chart-wrapper">
                                <canvas id="weatherChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <script>
                    // Pass data to charts.js
                    window.weatherData = {
                        currentWeather: ${JSON.stringify(currentWeather)},
                        dailySummaries: ${JSON.stringify(dailySummaries)}
                    };
                </script>
            </body>
            </html>
        `;
    }

    static renderError(error) {
        return `
            <div style="text-align: center; padding: 50px;">
                <h1 style="color: #ff4444;">Error Generating Visualizations</h1>
                <p style="color: #666;">${error.message}</p>
                <a href="/" class="back-btn">Return to Dashboard</a>
            </div>
        `;
    }
}

module.exports = VisualizationsView;