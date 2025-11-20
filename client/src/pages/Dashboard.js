import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigateToDashboard = () => {
    if (user.role === 'donor') {
      navigate('/donor-dashboard');
    } else {
      navigate('/receiver-dashboard');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to DishiFree, {user?.name}! 👋</h1>
          <p className="welcome-message">
            {user?.role === 'donor' 
              ? "Thank you for helping reduce food waste and feed your community."
              : "Find fresh, available food from generous donors in your area."
            }
          </p>
        </div>

        <div className="dashboard-actions">
          <div className="action-card primary">
            <div className="action-icon">
              {user?.role === 'donor' ? '🍽️' : '🔍'}
            </div>
            <h3>Go to {user?.role === 'donor' ? 'Donor' : 'Receiver'} Dashboard</h3>
            <p>
              {user?.role === 'donor' 
                ? "Post your surplus food listings and manage your donations."
                : "Browse available food listings and claim items you need."
              }
            </p>
            <button 
              onClick={handleNavigateToDashboard}
              className="btn btn-primary"
            >
              Enter Dashboard
            </button>
          </div>

          <div className="action-card secondary">
            <div className="action-icon">
              👤
            </div>
            <h3>Your Profile</h3>
            <p>
              View and update your account information, contact details, and preferences.
            </p>
            <button className="btn btn-secondary">
              Manage Profile
            </button>
          </div>

          <div className="action-card accent">
            <div className="action-icon">
              ℹ️
            </div>
            <h3>How It Works</h3>
            <p>
              {user?.role === 'donor' 
                ? "Learn how to effectively post and manage your food donations."
                : "Understand the process of finding and claiming food items."
              }
            </p>
            <button className="btn btn-accent">
              Get Help
            </button>
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">
              {user?.role === 'donor' ? 'Listings Posted' : 'Items Claimed'}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0</div>
            <div className="stat-label">Community Impact</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24h</div>
            <div className="stat-label">Active Now</div>
          </div>
        </div>

        <div className="dashboard-footer">
          <button onClick={handleGoHome} className="btn btn-outline">
            ← Back to Home
          </button>
          <button onClick={handleLogout} className="btn btn-logout">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;