class AlertForm {
    static render(cities) {
        return `
            <div class="section">
                <h2>Temperature Alerts</h2>
                <form action="/alerts/set-threshold" method="POST" class="alert-form">
                    <div class="form-group">
                        <label for="city">Select City</label>
                        <select name="cityId" id="city" required>
                            ${cities.map(city => `
                                <option value="${city.cityId}">${city.cityName}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="threshold">Temperature Threshold (°C)</label>
                        <input type="number" id="threshold" name="tempThreshold" 
                               step="0.1" required placeholder="e.g., 35">
                    </div>
                    <div class="form-group">
                        <label for="email">Email for Alerts</label>
                        <input type="email" id="email" name="email" required 
                               placeholder="your@email.com">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="submit-btn">Set Alert</button>
                    </div>
                </form>
            </div>
        `;
    }
}

module.exports = AlertForm;