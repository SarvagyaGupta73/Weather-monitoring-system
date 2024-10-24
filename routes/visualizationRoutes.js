const express = require('express');
const router = express.Router();
const { WeatherData, DailySummary } = require('../models');
const visualizationsView = require('../views/visualizations');

router.get('/', async (req, res) => {
    try {
        const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const currentWeather = await WeatherData.find().sort({ cityName: 1 });
        const dailySummaries = await DailySummary.find({
            date: { $gte: last24Hours }
        }).sort({ date: 1 });

        const html = visualizationsView.render({
            currentWeather,
            dailySummaries
        });

        res.send(html);
    } catch (error) {
        console.error('Error generating visualizations:', error);
        res.status(500).send(visualizationsView.renderError(error));
    }
});

module.exports = router;