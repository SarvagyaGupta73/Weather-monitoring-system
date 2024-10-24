const express = require('express');
const router = express.Router();
const { WeatherData, Threshold } = require('../models');
const emailService = require('../services/emailService');

router.post('/set-threshold', async (req, res) => {
    try {
        const { cityId, tempThreshold, email } = req.body;
        
        if (!cityId || !tempThreshold || !email) {
            throw new Error('Missing required fields');
        }

        const weatherData = await WeatherData.findOne({ cityId: parseInt(cityId) });
        if (!weatherData) {
            throw new Error('City not found');
        }

        await Threshold.findOneAndUpdate(
            { cityId: parseInt(cityId) },
            {
                cityId: parseInt(cityId),
                cityName: weatherData.cityName,
                tempThreshold: parseFloat(tempThreshold),
                email: email,
                lastNotified: null
            },
            { upsert: true }
        );

        // Send immediate alert if threshold is already exceeded
        if (weatherData.temp > parseFloat(tempThreshold)) {
            await emailService.sendAlert(
                email,
                `Temperature Alert: ${weatherData.cityName}`,
                weatherData,
                { tempThreshold: parseFloat(tempThreshold) }
            );
        }

        res.redirect('/');
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router;