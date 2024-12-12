const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "88e33dbae5dc0466a7b81109029e5b6c";

// DOM Elements
const trendingSection = document.getElementById("trendingMovies");
const popularSection = document.getElementById("popularMovies");

// Fetch trending movies
function fetchTrendingMovies() {
    fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results, trendingSection))
        .catch(error => console.error("Error fetching trending movies:", error));
}

// Fetch popular movies
function fetchPopularMovies() {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => displayMovies(data.results, popularSection))
        .catch(error => console.error("Error fetching popular movies:", error));
}

// Display movies in a specific section
function displayMovies(movies, container) {
    container.innerHTML = ""; // Clear previous content

    movies.forEach(movie => {
        if (!movie.adult) { // Exclude adult movies
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie");
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieElement.addEventListener("click", () => {
                window.location.href = `details.html?movieId=${movie.id}`;
            });
            container.appendChild(movieElement);
        }
    });
}

// Search functionality
function handleSearch(event) {
    event.preventDefault(); // Prevent form reload
    const searchInput = document.querySelector(".email-form input");
    const query = searchInput.value.trim();

    if (query) {
        // Redirect to search.html with the query as a URL parameter
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
}

// Add search event listener
document.querySelector(".email-form").addEventListener("submit", handleSearch);

// Initialize the trending and popular movies
fetchTrendingMovies();
fetchPopularMovies();


function toggleAnswer(element) {
  // تحديد العنصر الأب (faq-item)
  const faqItem = element.parentElement;

  // تبديل الكلاس 'active' لعرض الإجابة أو إخفائها
  faqItem.classList.toggle('active');
}