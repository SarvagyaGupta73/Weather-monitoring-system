// models/WeatherData.js
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    cityId: Number,
    cityName: String,
    main: String,
    temp: Number,
    feels_like: Number,
    timestamp: Date
});
const rollupSchema = new mongoose.Schema({
    cityId: Number,
    cityName: String,
    period: String,
    startTime: Date,
    endTime: Date,
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantWeather: String,
    readings: Number
});

const dailySummarySchema = new mongoose.Schema({
    cityId: Number,
    cityName: String,
    date: Date,
    avgTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantWeather: String,
    readings: Number,
    hourlyData: [{
        hour: Number,
        avgTemp: Number,
        maxTemp: Number,
        minTemp: Number,
        dominantWeather: String,
        readings: Number
    }]
});

const thresholdSchema = new mongoose.Schema({
    cityId: Number,
    cityName: String,
    tempThreshold: Number,
    email: String,
    lastNotified: Date
});

module.exports = {
    WeatherData: mongoose.model('WeatherData', weatherSchema),
    Rollup: mongoose.model('Rollup', rollupSchema),
    DailySummary: mongoose.model('DailySummary', dailySummarySchema),
    Threshold: mongoose.model('Threshold', thresholdSchema)
};