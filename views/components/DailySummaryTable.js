class DailySummaryTable {
    static render(dailySummaries) {
        return `
            <div class="section">
                <h2>Daily Temperature Summary</h2>
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Min Temp</th>
                            <th>Max Temp</th>
                            <th>Avg Temp</th>
                            <th>Weather</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${dailySummaries.map(summary => `
                            <tr>
                                <td>${summary.cityName}</td>
                                <td>${summary.minTemp.toFixed(1)}°C</td>
                                <td>${summary.maxTemp.toFixed(1)}°C</td>
                                <td>${summary.avgTemp.toFixed(1)}°C</td>
                                <td><span class="weather-badge">${summary.dominantWeather}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

module.exports = DailySummaryTable;