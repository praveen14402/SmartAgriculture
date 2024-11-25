import express from 'express';
import MLService from '../services/MLService';
import WeatherService from '../services/WeatherService';
import auth from '../middleware/auth';

const router = express.Router();

// Get crop recommendations
router.post('/recommend', auth, async (req, res) => {
  try {
    const { soilData, location } = req.body;

    // Get current weather data for the location
    const weatherData = await WeatherService.getCurrentWeather(
      location.lat,
      location.lng
    );

    // Get crop recommendations
    const recommendations = await MLService.recommendCrops(soilData, weatherData);
    
    res.json(recommendations);
  } catch (error) {
    console.error('Error in crop recommendation:', error);
    res.status(500).json({ error: 'Error generating recommendations' });
  }
});

export default router;