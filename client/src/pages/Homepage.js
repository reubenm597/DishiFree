import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Testimonials from '../components/common/Testimonials';
import '../styles/App.css';

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Share Food. Fight Hunger.</h1>
          <p>Connect surplus food from events, hotels, and homes with people who need it. Join our community in reducing food waste and feeding families.</p>
          
          {!user ? (
            <div className="hero-buttons">
              <Link to="/signup?role=donor" className="btn btn-primary">
                🍽️ Share Food as Donor
              </Link>
              <Link to="/signup?role=receiver" className="btn btn-secondary">
                🤝 Find Food as Receiver
              </Link>
            </div>
          ) : (
            <div className="hero-buttons">
              <Link to={user.role === 'donor' ? '/donor-dashboard' : '/receiver-dashboard'} className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section - Fixed */}
      <section className="features">
        <div className="feature">
          <h3>For Donors</h3>
          <p>Share your surplus food easily and reduce waste while helping your community. Perfect for restaurants, hotels, events, and households.</p>
        </div>
        
        <div className="feature">
          <h3>For Receivers</h3>
          <p>Find fresh, available food in your area from trusted sources. Connect directly with donors for quick and easy pickup.</p>
        </div>
        
        <div className="feature">
          <h3>For Communities</h3>
          <p>Build a sustainable food sharing ecosystem that benefits everyone. Reduce food waste while supporting those in need.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Homepage;