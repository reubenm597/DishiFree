import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import FoodListingForm from './FoodListingForm';
import MyListings from './MyListings';
import axios from 'axios';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('post');
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMyListings();
    }
  }, [user]);

  const fetchMyListings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/food/my-listings`);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Share your surplus food and help fight hunger</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'post' ? 'active' : ''}
          onClick={() => setActiveTab('post')}
        >
          Post New Food
        </button>
        <button 
          className={activeTab === 'listings' ? 'active' : ''}
          onClick={() => setActiveTab('listings')}
        >
          My Listings ({listings.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'post' && <FoodListingForm onSuccess={fetchMyListings} />}
        {activeTab === 'listings' && <MyListings listings={listings} />}
      </div>
    </div>
  );
};

export default DonorDashboard;