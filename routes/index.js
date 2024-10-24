const express = require('express');
const router = express.Router();
const alertRoutes = require('./alertRoutes');
const visualizationRoutes = require('./visualizationRoutes');
const { WeatherData, DailySummary, Threshold } = require('../models');
const dashboardView = require('../views/dashboard');

// Main dashboard route
router.get('/', async (req, res) => {
    try {
        const currentWeather = await WeatherData.find().sort({ cityName: 1 });
        const dailySummaries = await DailySummary.find({
            date: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        }).sort({ cityName: 1 });
        const thresholds = await Threshold.find();

        const html = dashboardView.render({
            currentWeather,
            dailySummaries,
            thresholds
        });
        
        res.send(html);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});

// Use alert and visualization routes
router.use('/alerts', alertRoutes);
router.use('/visualizations', visualizationRoutes);

module.exports = router;