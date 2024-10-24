const axios = require('axios');
const config = require('../config/config');
const { WeatherData, Rollup, DailySummary, Threshold } = require('../models');
const emailService = require('./emailService');
const weatherUtils = require('../utils/weatherUtils');

class WeatherMonitor {
    constructor() {
        this.baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    }

    async fetchWeatherData(city) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    id: city.id,
                    appid: config.OPENWEATHER_API_KEY
                }
            });

            const weatherData = {
                cityId: city.id,
                cityName: city.name,
                main: response.data.weather[0].main,
                temp: weatherUtils.kelvinToCelsius(response.data.main.temp),
                feels_like: weatherUtils.kelvinToCelsius(response.data.main.feels_like),
                timestamp: new Date()
            };

            // Save current weather data
            await WeatherData.findOneAndUpdate(
                { cityId: city.id },
                weatherData,
                { upsert: true }
            );

            // Perform rollups
            await this.performRollups(city.id, city.name);

            // Check threshold and send alert if needed
            await this.checkAndSendAlerts(city.id, weatherData);

            console.log(`Weather data updated for ${city.name}`);
        } catch (error) {
            console.error(`Error processing weather data for ${city.name}:`, error);
        }
    }

    async performRollups(cityId, cityName) {
        // ... (keeping the same rollup logic from the original code)
    }

    async checkAndSendAlerts(cityId, weatherData) {
        const threshold = await Threshold.findOne({ cityId });
        if (threshold && weatherData.temp > threshold.tempThreshold) {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            if (!threshold.lastNotified || threshold.lastNotified < oneHourAgo) {
                const emailSent = await emailService.sendAlert(
                    threshold.email,
                    `Temperature Alert: ${weatherData.cityName}`,
                    weatherData,
                    threshold
                );

                if (emailSent) {
                    await Threshold.updateOne(
                        { cityId },
                        { lastNotified: new Date() }
                    );
                }
            }
        }
    }

    async updateAllCities() {
        for (const city of config.CITIES) {
            await this.fetchWeatherData(city);
        }
    }
}

module.exports = new WeatherMonitor();