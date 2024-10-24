require('dotenv').config();

const config = {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    UPDATE_INTERVAL: 5 * 60 * 1000, // 5 minutes
    EMAIL_CONFIG: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,    
            pass: process.env.EMAIL_PASS
        }
    },
    CITIES: [
        { name: 'Delhi', id: 1273294 },
        { name: 'Mumbai', id: 1275339 },
        { name: 'Chennai', id: 1264527 },
        { name: 'Bangalore', id: 1277333 },
        { name: 'Kolkata', id: 1275004 },
        { name: 'Hyderabad', id: 1269843 }
    ]
};

module.exports = config;