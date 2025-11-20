import React, { useState } from 'react';
import axios from 'axios';

const FoodListingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    category: 'vegetarian',
    expiry: '',
    location: {
      address: ''
    },
    contactInfo: {
      phone: '',
      email: ''
    },
    pickupInstructions: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/food/create`, formData);
      setMessage('Food listing created successfully!');
      setFormData({
        title: '',
        description: '',
        quantity: '',
        category: 'vegetarian',
        expiry: '',
        location: { address: '' },
        contactInfo: { phone: '', email: '' },
        pickupInstructions: ''
      });
      onSuccess();
    } catch (error) {
      setMessage('Error creating food listing: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-form">
      <h3>Post Surplus Food</h3>
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Food Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Fresh Pizza from Office Party"
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the food items, ingredients, etc."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="e.g., Serves 10 people, 5 boxes"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-Free</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Expiry/Pickup Before *</label>
          <input
            type="datetime-local"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Pickup Location *</label>
          <input
            type="text"
            name="location.address"
            value={formData.location.address}
            onChange={handleChange}
            placeholder="Full address for pickup"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Phone</label>
          <input
            type="tel"
            name="contactInfo.phone"
            value={formData.contactInfo.phone}
            onChange={handleChange}
            placeholder="Phone number for coordination"
          />
        </div>

        <div className="form-group">
          <label>Pickup Instructions</label>
          <textarea
            name="pickupInstructions"
            value={formData.pickupInstructions}
            onChange={handleChange}
            placeholder="Any special instructions for pickup"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Food Listing'}
        </button>
      </form>
    </div>
  );
};

export default FoodListingForm;