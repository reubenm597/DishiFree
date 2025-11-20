import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const ReceiverDashboard = () => {
  const { user } = useAuth();
  const [foodListings, setFoodListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: ''
  });

  useEffect(() => {
    fetchFoodListings();
  }, [filters]);

  const fetchFoodListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/food/available?${params}`
      );
      setFoodListings(response.data);
    } catch (error) {
      console.error('Error fetching food listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimFood = async (foodId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/food/claim/${foodId}`
      );
      
      // Update the local state with the updated listing from the response
      const updatedListing = response.data.foodListing;
      
      setFoodListings(prevListings => 
        prevListings.map(listing => 
          listing._id === foodId ? updatedListing : listing
        )
      );
      
      alert('Food claimed successfully! Contact details are now available below.');
    } catch (error) {
      alert('Failed to claim food: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Check if current user claimed this item
  const isClaimedByMe = (listing) => {
    return listing.status === 'claimed' && 
           listing.claimedBy && 
           listing.claimedBy._id === user?.id;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Find Available Food</h1>
        <p>Browse surplus food from donors in your area</p>
      </div>

      {/* Search and Filter Section */}
      <div className="food-search">
        <h3>Search Food Listings</h3>
        
        <div className="search-filters">
          <div className="filter-group">
            <label>Food Category</label>
            <select 
              name="category" 
              value={filters.category} 
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              placeholder="Enter city or area"
            />
          </div>

          <button onClick={() => setFilters({ category: '', location: '' })} className="clear-filters">
            Clear Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading food listings...</div>
      ) : (
        <div className="food-grid">
          {foodListings.map(listing => (
            <div key={listing._id} className={`food-card ${listing.status === 'claimed' ? 'claimed' : ''}`}>
              <div className="food-details">
                <div className="listing-header">
                  <h3>{listing.title}</h3>
                  <span className={`status-badge ${
                    listing.status === 'claimed' 
                      ? (isClaimedByMe(listing) ? 'status-claimed-by-me' : 'status-claimed-by-others')
                      : 'status-available'
                  }`}>
                    {listing.status === 'claimed' 
                      ? (isClaimedByMe(listing) ? 'Claimed by You' : 'Already Claimed')
                      : 'Available'
                    }
                  </span>
                </div>
                
                <p className="food-description">{listing.description}</p>
                
                <div className="food-meta">
                  <span className="quantity">🍽️ {listing.quantity}</span>
                  <span className="category">📁 {listing.category}</span>
                </div>
                
                <div className="food-info">
                  <p><strong>Pickup Before:</strong> {formatDate(listing.expiry)}</p>
                  <p><strong>Location:</strong> {listing.location.address}</p>
                  {listing.donor && (
                    <p><strong>Donor:</strong> {listing.donor.name}</p>
                  )}
                </div>

                {/* Contact Information - Show when claimed by current user */}
                {isClaimedByMe(listing) && listing.contactInfo && (
                  <div className="contact-info">
                    <h4>📞 Contact Details for Pickup:</h4>
                    {listing.contactInfo.phone && (
                      <p><strong>Phone:</strong> {listing.contactInfo.phone}</p>
                    )}
                    {listing.contactInfo.email && (
                      <p><strong>Email:</strong> {listing.contactInfo.email}</p>
                    )}
                    {listing.pickupInstructions && (
                      <p><strong>Pickup Instructions:</strong> {listing.pickupInstructions}</p>
                    )}
                    <p style={{marginTop: '1rem', fontStyle: 'italic'}}>
                      Please contact the donor within 24 hours to arrange pickup.
                    </p>
                  </div>
                )}

                {/* Claim Button - Only show for available items */}
                {listing.status === 'available' && (
                  <button 
                    onClick={() => handleClaimFood(listing._id)}
                    className="btn btn-primary"
                    style={{marginTop: '1rem'}}
                  >
                    Claim This Food
                  </button>
                )}

                {/* Show message if claimed by someone else */}
                {listing.status === 'claimed' && !isClaimedByMe(listing) && (
                  <div className="already-claimed">
                    <p>⚠️ This item has already been claimed by another user</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && foodListings.length === 0 && (
        <div className="no-results">
          <h3>No food listings found</h3>
          <p>Try adjusting your search filters or check back later for new listings</p>
        </div>
      )}
    </div>
  );
};

export default ReceiverDashboard;