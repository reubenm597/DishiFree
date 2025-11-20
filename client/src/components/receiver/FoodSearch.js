import React, { useState } from 'react';

const FoodSearch = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    category: '',
    location: ''
  });

  const handleChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: '', location: '' };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  return (
    <div className="food-search">
      <h3>Search Food Listings</h3>
      
      <div className="search-filters">
        <div className="filter-group">
          <label>Food Category</label>
          <select 
            name="category" 
            value={filters.category} 
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Enter city or area"
          />
        </div>

        <button onClick={clearFilters} className="clear-filters">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FoodSearch;