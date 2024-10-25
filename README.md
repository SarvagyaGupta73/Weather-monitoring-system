# Weather-monitoring-system

A real-time weather monitoring dashboard that tracks weather conditions across multiple Indian cities, provides temperature alerts, and visualizes weather trends.

## Key Features

- **Real-time Weather Monitoring**
  - Tracks weather conditions for 6 major Indian cities
  - Updates every 5 minutes automatically
  - Shows current temperature and "feels like" temperature
  - Displays current weather conditions with visual indicators

  ![Weather Cards](https://github.com/SarvagyaGupta73/Weather-monitoring-system/blob/653531558d4e5865bc45dfa785f289541ab3de9c/screenshot/weather%20dashboard.jpg)

- **Temperature Analytics**
  - Daily temperature summaries
  - Min, max, and average temperature tracking
  - Dominant weather condition analysis
  - Historical weather data tracking

  ![Daily Summary](https://github.com/SarvagyaGupta73/Weather-monitoring-system/blob/53a054024c5085137045ee82200c9486c3a3d427/screenshot/Daily%20Summary.jpg)


- **Alert System**
  - Customizable temperature threshold alerts
  - Email notifications when thresholds are exceeded
  - City-specific alert configuration
  - Alert history tracking

  ![Alert Bar](https://github.com/SarvagyaGupta73/Weather-monitoring-system/blob/53a054024c5085137045ee82200c9486c3a3d427/screenshot/Alert.jpg)

- **Data Visualization**
  - Temperature trend charts
  - Weather distribution analysis
  - City-wise temperature comparisons
  - Interactive data visualization

  ![Visualization-1](https://github.com/SarvagyaGupta73/Weather-monitoring-system/blob/53a054024c5085137045ee82200c9486c3a3d427/screenshot/visualization1.jpg)
  ![Visualization-2](https://github.com/SarvagyaGupta73/Weather-monitoring-system/blob/53a054024c5085137045ee82200c9486c3a3d427/screenshot/visualization2.jpg)



## Design and Implementation

### Architecture
```
weather-monitoring-system/
├── config/             # Configuration files
├── models/            # Database models
├── services/          # Business logic services
├── routes/            # API routes
├── views/             # EJS templates
├── public/            # Static files
└── app.js            # Application entry point
```

### Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: EJS, Chart.js
- **APIs**: OpenWeatherMap API
- **Email Service**: Nodemailer with Gmail

## Requirements

- Node.js (v14 or higher)
- MongoDB
- Gmail account for email notifications
- OpenWeatherMap API key

## Setup and Installation

### Prerequisites
1. Node.js and npm installed
2. MongoDB installed and running
3. OpenWeatherMap API key
4. Gmail account with App Password configured

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-monitoring-system.git
cd weather-monitoring-system
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
OPENWEATHER_API_KEY=your_api_key
MONGODB_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

4. Configure the cities in `config/config.js`
```javascript
CITIES: [
    { name: 'Delhi', id: 1273294 },
    { name: 'Mumbai', id: 1275339 },
    // Add more cities as needed
]
```

5. Start the application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## Configuration

### Email Setup
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password
4. Use this password in your `.env` file

### Database Setup
1. Create a MongoDB Atlas account or use local MongoDB
2. Create a new cluster
3. Get your connection string
4. Update MONGODB_URI in `.env`

### API Setup
1. Create an OpenWeatherMap account
2. Generate an API key
3. Add the key to OPENWEATHER_API_KEY in `.env`

## Usage

1. **View Weather Data**
   - Access the dashboard at `/`
   - View current conditions and daily summaries
   - Auto-refreshes every 5 minutes

2. **Set Temperature Alerts**
   - Select a city from the dropdown
   - Set your temperature threshold
   - Enter your email for notifications
   - Click "Set Alert"

3. **View Visualizations**
   - Click "View Weather Visualizations"
   - Explore temperature trends
   - Analyze weather patterns


### Running Tests
- You can add and run tests to ensure everything is working correctly.

## Acknowledgments
- OpenWeatherMap API for weather data
- Chart.js for visualizations
- MongoDB Atlas for database hosting

