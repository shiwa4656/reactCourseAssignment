import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, searchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  
  // Update local state when prop changes (for syncing between parent and child)
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={localSearchTerm}
            onChange={handleChange}
            placeholder="Search products..."
            className="search-input"
            aria-label="Search products"
          />
          
          {localSearchTerm && (
            <button 
              type="button"
              className="clear-button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          
          <button type="submit" className="search-button" aria-label="Search">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;