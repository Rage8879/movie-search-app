import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './MovieList.css';

/**
 * MovieList Component
 * Displays a grid of movie cards with loading and empty states
 * @param {Array} movies - Array of movie objects to display
 * @param {Function} onMovieSelect - Callback for when a movie is selected
 * @param {Function} onToggleFavorite - Callback for toggling favorite status
 * @param {Function} isFavorite - Function to check if movie is favorited
 * @param {boolean} loading - Loading state indicator
 */
const MovieList = ({ 
  movies, 
  onMovieSelect, 
  onToggleFavorite, 
  isFavorite, 
  loading 
}) => {
  
  // Show loading spinner while fetching movies
  if (loading) {
    return (
      <div className="movie-list-container">
        <LoadingSpinner message="Searching for movies..." />
      </div>
    );
  }

  // Show message when no movies are found
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-container">
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h3>No Movies Found</h3>
          <p>Try searching for a different movie title</p>
          <div className="suggestions">
            <p>Popular suggestions:</p>
            <div className="suggestion-tags">
              <span className="suggestion-tag">The Avengers</span>
              <span className="suggestion-tag">Inception</span>
              <span className="suggestion-tag">The Dark Knight</span>
              <span className="suggestion-tag">Interstellar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {/* Results Header */}
      <div className="results-header">
        <h2>Search Results</h2>
        <p className="results-count">
          Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onMovieSelect={onMovieSelect}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(movie.imdbID)}
          />
        ))}
      </div>

      {/* Load More Button (for future pagination implementation) */}
      {movies.length >= 10 && (
        <div className="load-more-container">
          <button className="load-more-button" disabled>
            <span>Load More Movies</span>
            <small>(Coming Soon)</small>
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
