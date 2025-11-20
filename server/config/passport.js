import passport from 'passport';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Only setup Google Strategy if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  import('passport-google-oauth20').then(({ Strategy: GoogleStrategy }) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists with this googleId
          let user = await User.findOne({ googleId: profile.id });
          
          if (user) {
            return done(null, user);
          }

          // Check if user exists with the same email
          user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }

          // Create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'receiver', // default role
            isVerified: true
          });

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    ));
    console.log('Google OAuth strategy initialized');
  }).catch(error => {
    console.log('Failed to load Google OAuth strategy:', error.message);
  });
} else {
  console.log('Google OAuth disabled - missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});