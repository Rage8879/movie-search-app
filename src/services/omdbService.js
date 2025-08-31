import axios from 'axios';

// OMDb API configuration
// const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OMDb API key from http://www.omdbapi.com/
const API_KEY = process.env.REACT_APP_OMDB_API_KEY || 'YOUR_API_KEY_HERE'; // Get API key from environment variable
const BASE_URL = 'http://www.omdbapi.com/';

/**
 * Create axios instance with default configuration
 */
const omdbApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout
});

/**
 * Search for movies by title
 * @param {string} searchTerm - The movie title to search for
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} - API response containing search results
 */
export const searchMovies = async (searchTerm, page = 1) => {
  try {
    const response = await omdbApi.get('', {
      params: {
        apikey: API_KEY,
        s: searchTerm,
        page: page,
        type: 'movie' // Only search for movies, not series or episodes
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
};

/**
 * Get detailed information about a specific movie
 * @param {string} imdbID - The IMDB ID of the movie
 * @returns {Promise<Object>} - API response containing movie details
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await omdbApi.get('', {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full' // Get full plot description
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};

/**
 * Search for movies by title with additional filters
 * @param {string} searchTerm - The movie title to search for
 * @param {string} year - Release year (optional)
 * @param {string} type - Type of result (movie, series, episode)
 * @returns {Promise<Object>} - API response containing search results
 */
export const searchMoviesWithFilters = async (searchTerm, year = '', type = 'movie') => {
  try {
    const params = {
      apikey: API_KEY,
      s: searchTerm,
      type: type
    };
    
    // Add year filter if provided
    if (year) {
      params.y = year;
    }
    
    const response = await omdbApi.get('', { params });
    
    return response.data;
  } catch (error) {
    console.error('Error searching movies with filters:', error);
    throw new Error('Failed to search movies');
  }
};

export default {
  searchMovies,
  getMovieDetails,
  searchMoviesWithFilters
};
