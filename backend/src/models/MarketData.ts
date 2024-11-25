import mongoose from 'mongoose';

const marketDataSchema = new mongoose.Schema({
  cropId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  demand: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

marketDataSchema.index({ cropId: 1, timestamp: -1 });
marketDataSchema.index({ location: '2dsphere' });

export default mongoose.model('MarketData', marketDataSchema);