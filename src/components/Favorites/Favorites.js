import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import './Favorites.css';

/**
 * Favorites Component
 * Displays user's favorite movies with management options
 * @param {Array} favorites - Array of favorite movie objects
 * @param {Function} onMovieSelect - Callback for when a movie is selected
 * @param {Function} onToggleFavorite - Callback for toggling favorite status
 */
const Favorites = ({ favorites, onMovieSelect, onToggleFavorite }) => {
  const [sortBy, setSortBy] = useState('title'); // 'title', 'year', 'dateAdded'
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Filter favorites based on search term
   * @param {Array} movies - Array of favorite movies
   * @returns {Array} - Filtered movies
   */
  const filterFavorites = (movies) => {
    if (!searchTerm.trim()) return movies;
    
    return movies.filter(movie =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.Year.includes(searchTerm) ||
      (movie.Genre && movie.Genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  /**
   * Sort favorites based on selected criteria
   * @param {Array} movies - Array of favorite movies
   * @returns {Array} - Sorted movies
   */
  const sortFavorites = (movies) => {
    const sortedMovies = [...movies];
    
    switch (sortBy) {
      case 'title':
        return sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      case 'year':
        return sortedMovies.sort((a, b) => {
          const yearA = parseInt(a.Year) || 0;
          const yearB = parseInt(b.Year) || 0;
          return yearB - yearA; // Newest first
        });
      case 'dateAdded':
        return sortedMovies.reverse(); // Most recently added first
      default:
        return sortedMovies;
    }
  };

  /**
   * Clear all favorites with confirmation
   */
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites? This action cannot be undone.')) {
      favorites.forEach(movie => onToggleFavorite(movie));
    }
  };

  /**
   * Handle search input change
   * @param {Event} e - Input change event
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handle sort option change
   * @param {Event} e - Select change event
   */
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter and sort favorites
  const filteredFavorites = filterFavorites(favorites);
  const sortedFavorites = sortFavorites(filteredFavorites);

  return (
    <div className="favorites-container">
      {/* Header Section */}
      <div className="favorites-header">
        <div className="header-content">
          <h1 className="favorites-title">My Favorite Movies</h1>
          <p className="favorites-subtitle">
            Your personal collection of amazing movies
          </p>
        </div>
        
        {favorites.length > 0 && (
          <div className="favorites-count">
            <span className="count-badge">
              {favorites.length} movie{favorites.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div className="empty-icon">💔</div>
          <h2>No Favorites Yet</h2>
          <p>You haven't added any movies to your favorites yet.</p>
          <p>Start exploring and add movies you love!</p>
          <Link to="/" className="explore-button">
            Explore Movies
          </Link>
        </div>
      ) : (
        <>
          {/* Controls Section */}
          <div className="favorites-controls">
            {/* Search Bar */}
            <div className="search-favorites">
              <div className="search-input-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-favorites-input"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="clear-search"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Sort and Actions */}
            <div className="favorites-actions">
              <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="title">Title (A-Z)</option>
                  <option value="year">Year (Newest)</option>
                  <option value="dateAdded">Recently Added</option>
                </select>
              </div>

              <button
                onClick={handleClearAll}
                className="clear-all-button"
                aria-label="Clear all favorites"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="favorites-results-info">
            {searchTerm ? (
              <p>
                Showing {sortedFavorites.length} of {favorites.length} favorites
                {sortedFavorites.length === 0 && (
                  <span> - No matches found for "{searchTerm}"</span>
                )}
              </p>
            ) : (
              <p>Showing all {favorites.length} favorites</p>
            )}
          </div>

          {/* Movies Grid */}
          {sortedFavorites.length > 0 ? (
            <div className="favorites-grid">
              {sortedFavorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onMovieSelect={onMovieSelect}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={true} // All movies in favorites are favorited
                />
              ))}
            </div>
          ) : (
            <div className="no-search-results">
              <div className="no-results-icon">🔍</div>
              <h3>No matches found</h3>
              <p>Try adjusting your search terms</p>
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search-button"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Quick Stats */}
          {favorites.length > 0 && (
            <div className="favorites-stats">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{favorites.length}</span>
                  <span className="stat-label">Total Movies</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {new Set(favorites.map(m => m.Year)).size}
                  </span>
                  <span className="stat-label">Different Years</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {Math.round(favorites.reduce((acc, movie) => {
                      const year = parseInt(movie.Year);
                      return isNaN(year) ? acc : acc + year;
                    }, 0) / favorites.filter(m => !isNaN(parseInt(m.Year))).length) || 'N/A'}
                  </span>
                  <span className="stat-label">Avg Year</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
