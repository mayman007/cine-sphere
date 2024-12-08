const API_KEY = '88e33dbae5dc0466a7b81109029e5b6c';
const BASE_URL = 'https://api.themoviedb.org/3';

// DOM Elements
const trendingContainer = document.getElementById('trendingMovies');
const popularContainer = document.getElementById('popularMovies');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Fetch trending movies
async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    displayMovies(data.results, trendingContainer);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    trendingContainer.innerHTML = '<p>Error loading trending movies.</p>';
  }
}

// Fetch popular movies
async function fetchPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    displayMovies(data.results, popularContainer);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    popularContainer.innerHTML = '<p>Error loading popular movies.</p>';
  }
}

// Display movies in a container
function displayMovies(movies, container) {
  container.innerHTML = '';
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
    container.appendChild(movieItem);
  });
}

// Perform search and redirect to search.html
function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`;
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
});

// Fetch trending and popular movies on page load
fetchTrendingMovies();
fetchPopularMovies();
