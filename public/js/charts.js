// Get data passed from the server
const { currentWeather, dailySummaries } = window.weatherData;
const cities = [...new Set(currentWeather.map(d => d.cityName))];

// Helper function for random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Temperature Trends Chart
function createTrendsChart() {
    const trendsData = cities.map(city => {
        const cityData = dailySummaries.filter(d => d.cityName === city);
        return {
            label: city,
            data: cityData.map(d => d.avgTemp),
            borderColor: getRandomColor(),
            tension: 0.1,
            fill: false
        };
    });

    new Chart(document.getElementById('trendsChart'), {
        type: 'line',
        data: {
            labels: [...new Set(dailySummaries.map(d => 
                new Date(d.date).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric'
                })
            ))],
            datasets: trendsData
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Temperature Trends Over Time'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });
}

// Temperature Range Chart
function createRangeChart() {
    new Chart(document.getElementById('rangeChart'), {
        type: 'bar',
        data: {
            labels: cities,
            datasets: [
                {
                    label: 'Maximum Temperature',
                    data: cities.map(city => {
                        const cityData = dailySummaries.filter(d => d.cityName === city);
                        return Math.max(...cityData.map(d => d.maxTemp));
                    }),
                    backgroundColor: '#ff4444'
                },
                {
                    label: 'Average Temperature',
                    data: cities.map(city => {
                        const cityData = dailySummaries.filter(d => d.cityName === city);
                        return cityData.length > 0 
                            ? Number((cityData.reduce((sum, d) => sum + d.avgTemp, 0) / cityData.length).toFixed(1))
                            : 0;
                    }),
                    backgroundColor: '#1a73e8'
                },
                {
                    label: 'Minimum Temperature',
                    data: cities.map(city => {
                        const cityData = dailySummaries.filter(d => d.cityName === city);
                        return Math.min(...cityData.map(d => d.minTemp));
                    }),
                    backgroundColor: '#4CAF50'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Temperature Ranges by City'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });
}

// Weather Distribution Chart
function createWeatherChart() {
    const weatherCounts = currentWeather.reduce((acc, curr) => {
        acc[curr.main] = (acc[curr.main] || 0) + 1;
        return acc;
    }, {});

    new Chart(document.getElementById('weatherChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(weatherCounts),
            datasets: [{
                data: Object.values(weatherCounts),
                backgroundColor: Object.keys(weatherCounts).map(() => getRandomColor())
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                title: {
                    display: true,
                    text: 'Weather Condition Distribution'
                }
            }
        }
    });
}

// Initialize all charts
document.addEventListener('DOMContentLoaded', () => {
    createTrendsChart();
    createRangeChart();
    createWeatherChart();
});