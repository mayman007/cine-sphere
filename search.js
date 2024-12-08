const API_KEY = '88e33dbae5dc0466a7b81109029e5b6c';
const BASE_URL = 'https://api.themoviedb.org/3';

// Extract query from URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResultsContainer = document.getElementById('searchResults');

// Pre-fill search input with query
if (query) {
  searchInput.value = query;
  fetchSearchResults(query);
}

// Fetch and display search results
async function fetchSearchResults(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    displayMovies(data.results || []);
  } catch (error) {
    console.error('Error fetching search results:', error);
    searchResultsContainer.innerHTML = '<p>Error fetching search results.</p>';
  }
}

// Display movies
function displayMovies(movies) {
  searchResultsContainer.innerHTML = '';
  if (movies.length === 0) {
    searchResultsContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }
  movies.forEach((movie) => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie');
    movieItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    movieItem.addEventListener('click', () => {
      window.location.href = `details.html?movieId=${movie.id}`;
    });
    searchResultsContainer.appendChild(movieItem);
  });
}

// Search functionality for the new page
function performSearch() {
  const newQuery = searchInput.value.trim();
  if (newQuery) {
    window.location.href = `search.html?query=${encodeURIComponent(newQuery)}`;
  } else {
    alert('Please enter a search term!');
  }
}

// Event listeners for search button and "Enter" key
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
})