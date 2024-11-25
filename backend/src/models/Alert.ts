import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['weather', 'disease', 'market', 'system'],
    required: true
  },
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

alertSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model('Alert', alertSchema);