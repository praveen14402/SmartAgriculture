import mongoose from 'mongoose';

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  size: {
    type: Number,
    required: true
  },
  crops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  }],
  soilData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SoilData'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

farmSchema.index({ location: '2dsphere' });

export default mongoose.model('Farm', farmSchema);