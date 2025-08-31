import React, { useState } from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 * Provides movie search functionality with input validation
 * @param {Function} onSearch - Callback function to handle search
 * @param {boolean} loading - Loading state indicator
 */
const SearchBar = ({ onSearch, loading }) => {
  // Local state for search input
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
    }
  };

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Clear search input
   */
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <h2 className="search-title">Discover Amazing Movies</h2>
        <p className="search-subtitle">Search for movies by title and explore detailed information</p>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            {/* Search Icon */}
            <div className="search-icon">
              🔍
            </div>
            
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter movie title (e.g., The Dark Knight, Inception...)"
              className="search-input"
              disabled={loading}
              autoComplete="off"
            />
            
            {/* Clear Button */}
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-button"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Search Button */}
          <button
            type="submit"
            className={`search-button ${loading ? 'loading' : ''}`}
            disabled={loading || !searchTerm.trim()}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Searching...
              </>
            ) : (
              'Search Movies'
            )}
          </button>
        </form>
        
        {/* Search Tips */}
        <div className="search-tips">
          <p>💡 <strong>Pro Tips:</strong></p>
          <ul>
            <li>Try searching for exact movie titles for best results</li>
            <li>Use keywords from the movie title if you're not sure</li>
            <li>Popular searches: "Marvel", "Harry Potter", "Star Wars"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
