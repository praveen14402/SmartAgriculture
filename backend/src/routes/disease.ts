import express from 'express';
import multer from 'multer';
import MLService from '../services/MLService';
import auth from '../middleware/auth';

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Detect disease from image
router.post('/detect', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const result = await MLService.detectDisease(req.file.buffer);
    res.json(result);
  } catch (error) {
    console.error('Error in disease detection:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

export default router;