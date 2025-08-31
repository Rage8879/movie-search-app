import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './MovieDetails.css';

/**
 * MovieDetails Component
 * Displays detailed information about a selected movie
 * @param {Object} movie - Detailed movie object from API
 * @param {Function} onToggleFavorite - Callback for toggling favorite status
 * @param {Function} isFavorite - Function to check if movie is favorited
 * @param {boolean} loading - Loading state indicator
 */
const MovieDetails = ({ movie, onToggleFavorite, isFavorite, loading }) => {
  const [imageError, setImageError] = useState(false);

  // Show loading spinner while fetching movie details
  if (loading) {
    return (
      <div className="movie-details-container">
        <LoadingSpinner message="Loading movie details..." size="large" />
      </div>
    );
  }

  // Show message if no movie is selected or found
  if (!movie) {
    return (
      <div className="movie-details-container">
        <div className="no-movie-selected">
          <div className="no-movie-icon">🎬</div>
          <h2>No Movie Selected</h2>
          <p>Please select a movie from the search results to view details.</p>
          <Link to="/" className="back-to-search">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  /**
   * Handle favorite toggle
   */
  const handleFavoriteClick = () => {
    onToggleFavorite(movie);
  };

  /**
   * Handle image error
   */
  const handleImageError = () => {
    setImageError(true);
  };

  /**
   * Format rating value
   * @param {string} value - Rating value
   * @returns {string} - Formatted rating or N/A
   */
  const formatValue = (value) => {
    return value && value !== 'N/A' ? value : 'N/A';
  };

  /**
   * Parse and format ratings
   * @param {Array} ratings - Ratings array from API
   * @returns {Object} - Formatted ratings object
   */
  const formatRatings = (ratings) => {
    if (!ratings || !Array.isArray(ratings)) return {};
    
    const formattedRatings = {};
    ratings.forEach(rating => {
      if (rating.Source === 'Internet Movie Database') {
        formattedRatings.imdb = rating.Value;
      } else if (rating.Source === 'Rotten Tomatoes') {
        formattedRatings.rottenTomatoes = rating.Value;
      } else if (rating.Source === 'Metacritic') {
        formattedRatings.metacritic = rating.Value;
      }
    });
    
    return formattedRatings;
  };

  const ratings = formatRatings(movie.Ratings);
  const isMovieFavorited = isFavorite(movie.imdbID);

  return (
    <div className="movie-details-container">
      {/* Back Navigation */}
      <div className="back-navigation">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>
      </div>

      <div className="movie-details-content">
        {/* Movie Poster Section */}
        <div className="movie-poster-section">
          {!imageError && movie.Poster && movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              className="movie-details-poster"
              onError={handleImageError}
            />
          ) : (
            <div className="poster-placeholder-large">
              <div className="placeholder-icon-large">🎬</div>
              <p>No Poster Available</p>
            </div>
          )}

          {/* Favorite Button */}
          <button
            className={`favorite-button-large ${isMovieFavorited ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isMovieFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isMovieFavorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>

        {/* Movie Information Section */}
        <div className="movie-info-section">
          {/* Title and Basic Info */}
          <div className="movie-header">
            <h1 className="movie-details-title">{movie.Title}</h1>
            <div className="movie-basic-info">
              <span className="movie-year">{formatValue(movie.Year)}</span>
              <span className="movie-rated">{formatValue(movie.Rated)}</span>
              <span className="movie-runtime">{formatValue(movie.Runtime)}</span>
            </div>
          </div>

          {/* Ratings */}
          {Object.keys(ratings).length > 0 && (
            <div className="movie-ratings">
              <h3>Ratings</h3>
              <div className="ratings-grid">
                {ratings.imdb && (
                  <div className="rating-item">
                    <span className="rating-source">IMDb</span>
                    <span className="rating-value">{ratings.imdb}</span>
                  </div>
                )}
                {ratings.rottenTomatoes && (
                  <div className="rating-item">
                    <span className="rating-source">Rotten Tomatoes</span>
                    <span className="rating-value">{ratings.rottenTomatoes}</span>
                  </div>
                )}
                {ratings.metacritic && (
                  <div className="rating-item">
                    <span className="rating-source">Metacritic</span>
                    <span className="rating-value">{ratings.metacritic}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Plot */}
          {movie.Plot && movie.Plot !== 'N/A' && (
            <div className="movie-plot">
              <h3>Plot</h3>
              <p>{movie.Plot}</p>
            </div>
          )}

          {/* Details Grid */}
          <div className="movie-details-grid">
            <div className="detail-item">
              <strong>Genre:</strong>
              <span>{formatValue(movie.Genre)}</span>
            </div>
            <div className="detail-item">
              <strong>Director:</strong>
              <span>{formatValue(movie.Director)}</span>
            </div>
            <div className="detail-item">
              <strong>Writer:</strong>
              <span>{formatValue(movie.Writer)}</span>
            </div>
            <div className="detail-item">
              <strong>Actors:</strong>
              <span>{formatValue(movie.Actors)}</span>
            </div>
            <div className="detail-item">
              <strong>Language:</strong>
              <span>{formatValue(movie.Language)}</span>
            </div>
            <div className="detail-item">
              <strong>Country:</strong>
              <span>{formatValue(movie.Country)}</span>
            </div>
            <div className="detail-item">
              <strong>Awards:</strong>
              <span>{formatValue(movie.Awards)}</span>
            </div>
            <div className="detail-item">
              <strong>Box Office:</strong>
              <span>{formatValue(movie.BoxOffice)}</span>
            </div>
            <div className="detail-item">
              <strong>Production:</strong>
              <span>{formatValue(movie.Production)}</span>
            </div>
            <div className="detail-item">
              <strong>IMDb ID:</strong>
              <span className="imdb-id">{movie.imdbID}</span>
            </div>
          </div>

          {/* IMDb Link */}
          {movie.imdbID && (
            <div className="external-links">
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="imdb-link"
              >
                View on IMDb →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
