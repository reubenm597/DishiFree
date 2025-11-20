import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Regular authentication
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    // Successful authentication
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

export default router;