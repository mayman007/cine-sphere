const API_KEY = '88e33dbae5dc0466a7b81109029e5b6c';
const BASE_URL = 'https://api.themoviedb.org/3';

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// Fetch and display movie details
async function fetchMovieDetails() {
  if (!movieId) {
    document.getElementById('movieDetails').innerHTML = '<p>Invalid movie ID.</p>';
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const movie = await response.json();

    // Display movie details
    document.getElementById('movieDetails').innerHTML = `
      <h2>${movie.title}</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <p><strong>Release Date:</strong> ${movie.release_date}</p>
      <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
      <p><strong>Votes:</strong> ${movie.vote_count}</p>
      <p><strong>Overview:</strong> ${movie.overview}</p>
      <p><strong>Genres:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
    `;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    document.getElementById('movieDetails').innerHTML = '<p>Error fetching movie details.</p>';
  }
}

// Fetch movie details on page load
fetchMovieDetails();
