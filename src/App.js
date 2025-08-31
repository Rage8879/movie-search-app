import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Favorites from './components/Favorites/Favorites';
import { searchMovies, getMovieDetails } from './services/omdbService';

/**
 * Main App Component
 * Manages the overall state and routing for the movie search application
 */
function App() {
  // State management for movies, favorites, loading, and error handling
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites state changes
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Handle movie search functionality
   * @param {string} searchTerm - The search term entered by user
   */
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setError('Please enter a movie title');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const results = await searchMovies(searchTerm);
      if (results.Response === 'True') {
        setMovies(results.Search);
      } else {
        setError(results.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle movie selection to view details
   * @param {string} imdbID - The IMDB ID of the selected movie
   */
  const handleMovieSelect = async (imdbID) => {
    setLoading(true);
    setError('');
    
    try {
      const movieDetails = await getMovieDetails(imdbID);
      if (movieDetails.Response === 'True') {
        setSelectedMovie(movieDetails);
      } else {
        setError('Failed to fetch movie details');
      }
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle movie in favorites list
   * @param {Object} movie - Movie object to add/remove from favorites
   */
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    
    if (isFavorite) {
      // Remove from favorites
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    } else {
      // Add to favorites
      setFavorites([...favorites, movie]);
    }
  };

  /**
   * Check if a movie is in favorites
   * @param {string} imdbID - The IMDB ID to check
   * @returns {boolean} - True if movie is in favorites
   */
  const isFavorite = (imdbID) => {
    return favorites.some(fav => fav.imdbID === imdbID);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          {/* Home route with search and movie list */}
          <Route 
            path="/" 
            element={
              <div className="main-content">
                <SearchBar onSearch={handleSearch} loading={loading} />
                
                {error && <div className="error-message">{error}</div>}
                
                <MovieList
                  movies={movies}
                  onMovieSelect={handleMovieSelect}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={isFavorite}
                  loading={loading}
                />
              </div>
            } 
          />
          
          {/* Movie details route */}
          <Route 
            path="/movie/:id" 
            element={
              <MovieDetails
                movie={selectedMovie}
                onToggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
                loading={loading}
              />
            } 
          />
          
          {/* Favorites route */}
          <Route 
            path="/favorites" 
            element={
              <Favorites
                favorites={favorites}
                onMovieSelect={handleMovieSelect}
                onToggleFavorite={toggleFavorite}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
