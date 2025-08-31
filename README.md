# 🎬 MovieFinder - React Movie Search App

A feature-rich React application that allows users to search for movies using the OMDb API, view detailed information, and save their favorite movies.

## 🚀 Features

- **Movie Search**: Search for movies by title using the OMDb API
- **Detailed View**: View comprehensive movie information including plot, cast, ratings, and more
- **Favorites System**: Save and manage your favorite movies with local storage persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: Modern, intuitive interface with smooth animations
- **Search & Filter**: Filter and sort your favorite movies
- **Statistics**: View quick stats about your movie collection

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with flexbox and grid
- **OMDb API** - Movie database API
- **Local Storage** - Persistent favorites storage

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Internet connection for API requests
- OMDb API key (free registration required)

## 🔧 Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd movie-search-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your OMDb API key**:
   - Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your actual API key:
   ```
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser and visit**:
   ```
   http://localhost:3000
   ```

## 🔑 API Configuration

This app uses the OMDb API for movie data. You need to:

1. **Get an API key** from [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. **Create a .env file** in the root directory
3. **Add your API key**:
   ```
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

The API service is configured in `src/services/omdbService.js` and includes:
- Movie search functionality  
- Detailed movie information retrieval
- Error handling and timeout management
- Environment variable support for API key security

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/              # Navigation header
│   ├── SearchBar/           # Movie search interface
│   ├── MovieList/           # Display search results
│   ├── MovieCard/           # Individual movie card
│   ├── MovieDetails/        # Detailed movie view
│   ├── Favorites/           # Favorites management
│   └── LoadingSpinner/      # Loading animations
├── services/
│   └── omdbService.js       # OMDb API integration
├── App.js                   # Main application component
├── App.css                  # Global styles
└── index.js                 # Application entry point
```

## 🎯 Usage

### Searching for Movies
1. Enter a movie title in the search bar
2. Click "Search Movies" or press Enter
3. Browse through the search results
4. Click on any movie card to view detailed information

### Managing Favorites
1. Click the heart icon on any movie card to add/remove from favorites
2. Navigate to "My Favorites" to view your saved movies
3. Use the search and sort features to organize your favorites
4. Click "Clear All" to remove all favorites (with confirmation)

### Movie Details
1. Click on any movie card to view detailed information
2. See comprehensive details including plot, cast, ratings, and more
3. Add/remove from favorites directly from the details page
4. Click "View on IMDb" to open the movie's IMDb page

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔮 Future Enhancements

- Pagination for search results
- Advanced filtering options (genre, year, rating)
- User accounts and cloud sync
- Movie trailers integration
- Social sharing features
- Watchlist functionality
- Movie recommendations

## 🐛 Troubleshooting

### Common Issues

1. **API Key Issues**: Make sure you have set up your `.env` file with a valid OMDb API key.

2. **API Rate Limiting**: The OMDb API has usage limits. If you encounter errors, wait a few minutes before making more requests.

3. **No Search Results**: Ensure you're entering valid movie titles. Try popular movie names like "Inception" or "The Dark Knight".

4. **Images Not Loading**: Some movies may not have poster images available in the OMDb database.

## 📄 License

This project is created for educational purposes. The OMDb API is used under their terms of service.

## 🙏 Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for providing movie data
- [Create React App](https://create-react-app.dev/) for the initial setup
- [React Router](https://reactrouter.com/) for routing capabilities

---

**Enjoy exploring movies with MovieFinder! 🎬✨**
