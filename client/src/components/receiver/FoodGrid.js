import React from 'react';

const FoodGrid = ({ listings, onClaim }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="food-grid">
      {listings.map(listing => (
        <div key={listing._id} className="food-card">
          <div className="food-image">
            {listing.images && listing.images.length > 0 ? (
              <img src={`${process.env.REACT_APP_API_URL}/${listing.images[0]}`} alt={listing.title} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
          
          <div className="food-details">
            <h3>{listing.title}</h3>
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

            <button 
              onClick={() => onClaim(listing._id)}
              className="claim-button"
            >
              Claim This Food
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodGrid;