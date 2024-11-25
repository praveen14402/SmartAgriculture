import express from 'express';
import WeatherService from '../services/WeatherService';
import auth from '../middleware/auth';

const router = express.Router();

// Get current weather
router.get('/current', auth, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const weather = await WeatherService.getCurrentWeather(
      Number(lat),
      Number(lon)
    );
    res.json(weather);
  } catch (error) {
    console.error('Weather fetch error:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// Get weather forecast
router.get('/forecast', auth, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const forecast = await WeatherService.getForecast(
      Number(lat),
      Number(lon)
    );
    res.json(forecast);
  } catch (error) {
    console.error('Forecast fetch error:', error);
    res.status(500).json({ error: 'Error fetching forecast data' });
  }
});

// Get weather alerts
router.get('/alerts', auth, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const alerts = await WeatherService.getWeatherAlerts(
      Number(lat),
      Number(lon)
    );
    res.json(alerts);
  } catch (error) {
    console.error('Weather alerts fetch error:', error);
    res.status(500).json({ error: 'Error fetching weather alerts' });
  }
});

export default router;