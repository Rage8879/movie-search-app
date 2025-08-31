import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

/**
 * MovieCard Component
 * Displays individual movie information in a card format
 * @param {Object} movie - Movie object containing movie details
 * @param {Function} onMovieSelect - Callback for when movie is selected for details
 * @param {Function} onToggleFavorite - Callback for toggling favorite status
 * @param {boolean} isFavorite - Whether the movie is in favorites
 */
const MovieCard = ({ movie, onMovieSelect, onToggleFavorite, isFavorite }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  /**
   * Handle movie card click to view details
   */
  const handleCardClick = () => {
    onMovieSelect(movie.imdbID);
    navigate(`/movie/${movie.imdbID}`);
  };

  /**
   * Handle favorite toggle with event propagation prevention
   * @param {Event} e - Click event
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    onToggleFavorite(movie);
  };

  /**
   * Handle image load success
   */
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  /**
   * Handle image load error
   */
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  /**
   * Get display year from movie year string
   * @param {string} year - Year string from API
   * @returns {string} - Formatted year
   */
  const getDisplayYear = (year) => {
    if (!year || year === 'N/A') return 'Unknown';
    return year;
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      {/* Movie Poster */}
      <div className="movie-poster-container">
        {imageLoading && (
          <div className="poster-loading">
            <div className="poster-skeleton"></div>
          </div>
        )}
        
        {!imageError && movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="movie-poster"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? 'none' : 'block' }}
          />
        ) : (
          <div className="poster-placeholder">
            <div className="placeholder-icon">🎬</div>
            <p>No Poster Available</p>
          </div>
        )}

        {/* Favorite Button */}
        <button
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        {/* Year Badge */}
        <div className="year-badge">
          {getDisplayYear(movie.Year)}
        </div>
      </div>

      {/* Movie Info */}
      <div className="movie-info">
        <h3 className="movie-title" title={movie.Title}>
          {movie.Title}
        </h3>
        
        <div className="movie-meta">
          <span className="movie-type">
            {movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : 'Movie'}
          </span>
          <span className="movie-year">
            {getDisplayYear(movie.Year)}
          </span>
        </div>

        {/* IMDb ID for reference */}
        <div className="movie-id">
          <small>IMDb: {movie.imdbID}</small>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="card-overlay">
        <div className="overlay-content">
          <p>Click to view details</p>
          <div className="overlay-icon">👁️</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
