const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const weatherMonitor = require('./services/weatherMonitor');
const emailService = require('./services/emailService');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', routes);

// Start server
async function startServer() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');

        // Verify email configuration
        await emailService.verifyConnection();

        // Start weather monitoring
        await weatherMonitor.updateAllCities();
        setInterval(() => weatherMonitor.updateAllCities(), config.UPDATE_INTERVAL);

        // Start server
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`\nWeather Monitoring System running at http://localhost:${port}`);
            console.log('\nSystem Configuration:');
            console.log('-------------------');
            console.log(`Update Interval: ${config.UPDATE_INTERVAL / 1000 / 60} minutes`);
            console.log(`Email Notifications: ${config.EMAIL_CONFIG.auth.user}`);
            console.log(`Monitored Cities: ${config.CITIES.length}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();