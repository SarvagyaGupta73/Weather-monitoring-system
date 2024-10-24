class WeatherUtils {
    static kelvinToCelsius(kelvin) {
        return Math.round((kelvin - 273.15) * 100) / 100;
    }

    static getDominantWeather(weatherArray) {
        if (!weatherArray || weatherArray.length === 0) return '';
        const counts = weatherArray.reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    }

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

module.exports = WeatherUtils;