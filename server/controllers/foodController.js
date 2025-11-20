import FoodListing from '../models/FoodListing.js';

export const createFoodListing = async (req, res) => {
  try {
    const foodData = {
      ...req.body,
      donor: req.user._id
    };

    const foodListing = await FoodListing.create(foodData);
    
    res.status(201).json({
      message: 'Food listing created successfully',
      foodListing
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAvailableFood = async (req, res) => {
  try {
    const { category, location } = req.query;
    let filter = { 
      $or: [
        { status: 'available' },
        { status: 'claimed', claimedBy: req.user?._id } // Include items claimed by current user
      ]
    };

    if (category) filter.$and = [{ ...filter.$and }, { category }];
    if (location) filter.$and = [{ ...filter.$and }, { 'location.address': new RegExp(location, 'i') }];

    const foodListings = await FoodListing.find(filter)
      .populate('donor', 'name profile')
      .populate('claimedBy', 'name email') // Populate claimedBy info
      .sort({ createdAt: -1 });

    res.json(foodListings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const claimFood = async (req, res) => {
  try {
    const { id } = req.params;
    
    const foodListing = await FoodListing.findById(id);
    
    if (!foodListing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    if (foodListing.status !== 'available') {
      return res.status(400).json({ message: 'Food is no longer available' });
    }

    foodListing.status = 'claimed';
    foodListing.claimedBy = req.user._id;
    await foodListing.save();

    // Populate the updated listing before sending response
    const updatedListing = await FoodListing.findById(id)
      .populate('donor', 'name profile')
      .populate('claimedBy', 'name email');

    res.json({ 
      message: 'Food claimed successfully', 
      foodListing: updatedListing 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const foodListings = await FoodListing.find({ donor: req.user._id })
      .populate('claimedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(foodListings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};