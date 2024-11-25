import express from 'express';
import AlertService from '../services/AlertService';
import auth from '../middleware/auth';

const router = express.Router();

// Get user alerts
router.get('/', auth, async (req, res) => {
  try {
    const alerts = await AlertService.getUserAlerts(req.user.userId);
    res.json(alerts);
  } catch (error) {
    console.error('Alerts fetch error:', error);
    res.status(500).json({ error: 'Error fetching alerts' });
  }
});

// Mark alert as read
router.patch('/:alertId/read', auth, async (req, res) => {
  try {
    const { alertId } = req.params;
    await AlertService.markAlertAsRead(alertId, req.user.userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Mark alert read error:', error);
    res.status(500).json({ error: 'Error updating alert' });
  }
});

// Delete alert
router.delete('/:alertId', auth, async (req, res) => {
  try {
    const { alertId } = req.params;
    await AlertService.deleteAlert(alertId, req.user.userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete alert error:', error);
    res.status(500).json({ error: 'Error deleting alert' });
  }
});

export default router;