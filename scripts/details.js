const API_KEY = '88e33dbae5dc0466a7b81109029e5b6c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

// Fetch and display movie details
async function fetchMovieDetails() {
  if (!movieId) {
    console.error('No movie ID provided');
    return;
  }

  try {
    // Fetch movie details
    const movieResponse = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    const movie = await movieResponse.json();

    // Fetch movie credits (cast)
    const creditsResponse = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const credits = await creditsResponse.json();

    // Update poster image
    const posterImage = document.getElementById('posterImage');
    posterImage.src = movie.poster_path 
      ? `${IMAGE_BASE_URL}${movie.poster_path}` 
      : 'https://via.placeholder.com/300x450';
    posterImage.alt = movie.title;

    // Update movie title
    document.getElementById('movieTitle').textContent = movie.title;

    // Update release year
    document.getElementById('releaseYear').textContent = movie.release_date 
      ? new Date(movie.release_date).getFullYear() 
      : 'N/A';

    // Update genres
    document.getElementById('movieGenre').textContent = movie.genres.length > 0 
      ? movie.genres.map(genre => genre.name).join(', ') 
      : 'N/A';

    // Update runtime
    document.getElementById('movieDuration').textContent = movie.runtime 
      ? `${movie.runtime} minutes` 
      : 'N/A';

    // Update synopsis
    document.getElementById('movieDescription').textContent = movie.overview || 'No synopsis available.';

    // Update rating
    const ratingElement = document.getElementById('movieRating');
    ratingElement.innerHTML = movie.vote_average 
      ? `⭐ ${movie.vote_average.toFixed(1)}/10` 
      : '⭐ N/A';

    // Update cast
    const castList = document.getElementById('castList');
    castList.innerHTML = ''; // Clear existing cast
    
    // Limit to first 6 cast members
    const topCast = credits.cast.slice(0, 6);
    topCast.forEach(actor => {
      const castMember = document.createElement('span');
      castMember.textContent = actor.name;
      castMember.classList.add('cast-member');
      castList.appendChild(castMember);
    });

  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

// Fetch movie details on page load
fetchMovieDetails();