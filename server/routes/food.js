import express from 'express';
import { 
  createFoodListing, 
  getAvailableFood, 
  claimFood, 
  getMyListings 
} from '../controllers/foodController.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authMiddleware, roleMiddleware(['donor']), createFoodListing);
router.get('/available', getAvailableFood); // Note: removed authMiddleware to allow browsing
router.put('/claim/:id', authMiddleware, roleMiddleware(['receiver']), claimFood);
router.get('/my-listings', authMiddleware, roleMiddleware(['donor']), getMyListings);

export default router;