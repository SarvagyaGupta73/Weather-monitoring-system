const nodemailer = require('nodemailer');
const config = require('../config/config');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: config.EMAIL_CONFIG.auth,
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async verifyConnection() {
        try {
            await this.transporter.verify();
            console.log('Email system configured successfully');
            return true;
        } catch (error) {
            console.error('Email configuration error:', error);
            return false;
        }
    }

    async sendAlert(to, subject, weatherData, threshold) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
                <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h2 style="color: #ff4444;">⚠️ Temperature Alert</h2>
                    <p>The temperature in ${weatherData.cityName} has exceeded your threshold!</p>
                    <div style="background: #fff4e5; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="margin: 5px 0;">Current Temperature: <strong>${weatherData.temp.toFixed(1)}°C</strong></p>
                        <p style="margin: 5px 0;">Your Threshold: <strong>${threshold.tempThreshold}°C</strong></p>
                        <p style="margin: 5px 0;">Weather Condition: <strong>${weatherData.main}</strong></p>
                        <p style="margin: 5px 0;">Time: <strong>${new Date().toLocaleString()}</strong></p>
                    </div>
                </div>
            </div>
        `;

        try {
            await this.transporter.sendMail({
                from: {
                    name: 'Weather Alert System',
                    address: config.EMAIL_CONFIG.auth.user
                },
                to,
                subject,
                html: htmlContent
            });
            console.log('Email sent successfully to:', to);
            return true;
        } catch (error) {
            console.error('Failed to send email:', error);
            return false;
        }
    }
}

module.exports = new EmailService();