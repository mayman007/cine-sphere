const API_KEY = '88e33dbae5dc0466a7b81109029e5b6c';
const BASE_URL = 'https://api.themoviedb.org/3';

const trendingSection = document.getElementById('trendingSection');
const popularSection = document.getElementById('popularSection');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const mainContainer = document.querySelector('main');
const headerTitle = document.querySelector('header h1'); // Assuming the title is an <h1> tag

// Fetch data from the API
async function fetchMovies(endpoint, container, query = '') {
  try {
    const url = query
      ? `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
      : `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`;

    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results || [], container);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayMovies(movies, container) {
    container.innerHTML = '';
    if (movies.length === 0) {
      container.innerHTML = '<p>No movies found.</p>';
      return;
    }
    movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie');
      movieItem.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      `;
  
      // Add click event to redirect to movie details
      movieItem.addEventListener('click', () => {
        window.location.href = `details.html?movieId=${movie.id}`;
      });
  
      container.appendChild(movieItem);
    });
  }

// Search functionality
function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    // Hide trending and popular sections
    trendingSection.style.display = 'none';
    popularSection.style.display = 'none';

    // Remove existing search results if any
    let searchResultsSection = document.getElementById('searchResultsSection');
    if (!searchResultsSection) {
      searchResultsSection = document.createElement('section');
      searchResultsSection.id = 'searchResultsSection';
      searchResultsSection.innerHTML = '<h2>Search Results</h2><div id="searchResults" class="movie-vertical"></div>';
      mainContainer.appendChild(searchResultsSection);
    }

    const searchResultsContainer = document.getElementById('searchResults');
    fetchMovies(`/search/movie`, searchResultsContainer, query);
  } else {
    alert('Please enter a search term!');
  }
}

// Event listener for search button
searchBtn.addEventListener('click', performSearch);

// Event listener for pressing "Enter" in the search input
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    performSearch();
  }
});

// Restore Trending and Popular Sections
headerTitle.addEventListener('click', () => {
  trendingSection.style.display = 'block';
  popularSection.style.display = 'block';

  // Remove search results section if it exists
  const searchResultsSection = document.getElementById('searchResultsSection');
  if (searchResultsSection) {
    searchResultsSection.remove();
  }
});
  
// Fetch trending and popular movies on page load
fetchMovies('/trending/movie/day', document.getElementById('trendingMovies'));
fetchMovies('/movie/popular', document.getElementById('popularMovies'));
