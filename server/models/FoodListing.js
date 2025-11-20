import mongoose from 'mongoose';

const foodListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['vegetarian', 'non-vegetarian', 'vegan', 'gluten-free'],
    default: 'vegetarian'
  },
  expiry: {
    type: Date,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'expired', 'picked-up'],
    default: 'available'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [String],
  contactInfo: {
    phone: String,
    email: String
  },
  dietaryInfo: [String],
  pickupInstructions: String
}, {
  timestamps: true
});

// Index for geospatial queries
foodListingSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model('FoodListing', foodListingSchema);