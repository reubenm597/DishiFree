import React from 'react';

const MyListings = ({ listings }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'available': { class: 'status-available', text: 'Available' },
      'claimed': { class: 'status-claimed', text: 'Claimed' },
      'expired': { class: 'status-expired', text: 'Expired' },
      'picked-up': { class: 'status-pickedup', text: 'Picked Up' }
    };
    
    const config = statusConfig[status] || { class: 'status-unknown', text: status };
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="my-listings">
      <h3>My Food Listings</h3>
      
      {listings.length === 0 ? (
        <div className="no-listings">
          <p>You haven't posted any food listings yet.</p>
        </div>
      ) : (
        <div className="listings-container">
          {listings.map(listing => (
            <div key={listing._id} className="listing-card">
              <div className="listing-header">
                <h4>{listing.title}</h4>
                {getStatusBadge(listing.status)}
              </div>
              
              <p className="listing-description">{listing.description}</p>
              
              <div className="listing-details">
                <div className="detail-item">
                  <strong>Quantity:</strong> {listing.quantity}
                </div>
                <div className="detail-item">
                  <strong>Category:</strong> {listing.category}
                </div>
                <div className="detail-item">
                  <strong>Expires:</strong> {formatDate(listing.expiry)}
                </div>
                <div className="detail-item">
                  <strong>Location:</strong> {listing.location.address}
                </div>
              </div>

              {listing.claimedBy && (
                <div className="claimer-info">
                  <strong>Claimed by:</strong> {listing.claimedBy.name} ({listing.claimedBy.email})
                </div>
              )}

              <div className="listing-footer">
                <span className="created-date">
                  Posted: {formatDate(listing.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;