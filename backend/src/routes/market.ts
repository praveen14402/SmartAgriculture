import express from 'express';
import MarketService from '../services/MarketService';
import auth from '../middleware/auth';

const router = express.Router();

// Get current market prices
router.get('/prices', auth, async (req, res) => {
  try {
    const prices = await MarketService.getCurrentPrices();
    res.json(prices);
  } catch (error) {
    console.error('Market prices fetch error:', error);
    res.status(500).json({ error: 'Error fetching market prices' });
  }
});

// Get market trends
router.get('/trends', auth, async (req, res) => {
  try {
    const trends = await MarketService.getMarketTrends();
    res.json(trends);
  } catch (error) {
    console.error('Market trends fetch error:', error);
    res.status(500).json({ error: 'Error fetching market trends' });
  }
});

// Get price predictions
router.get('/predictions', auth, async (req, res) => {
  try {
    const { cropId } = req.query;
    if (!cropId) {
      return res.status(400).json({ error: 'Crop ID is required' });
    }

    const predictions = await MarketService.getPricePredictions(String(cropId));
    res.json(predictions);
  } catch (error) {
    console.error('Price predictions fetch error:', error);
    res.status(500).json({ error: 'Error fetching price predictions' });
  }
});

export default router;