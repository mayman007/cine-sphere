document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = "https://api.themoviedb.org/3";
    const API_KEY = "88e33dbae5dc0466a7b81109029e5b6c";
    const IMG_URL = "https://image.tmdb.org/t/p/w500";

    // DOM elements
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchResultsContainer = document.getElementById("searchResults");

    // Function to display movies
    function displayMovies(movies) {
        searchResultsContainer.innerHTML = ""; // Clear previous results
        
        if (movies.length === 0) {
            searchResultsContainer.innerHTML = "<p style='color: white; text-align: center;'>No results found.</p>";
            return;
        }

        movies.forEach(movie => {
            // Skip adult and movies without poster
            if (!movie.adult && movie.poster_path) {
                const movieElement = document.createElement("div");
                movieElement.classList.add("movie");
                
                // Create movie card content
                movieElement.innerHTML = `
                    <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
                    <h3><span class="movie-title">${movie.title}</span></h3>
                `;
                
                // Add event listener to the entire movie card (not just the title)
                movieElement.addEventListener('click', () => {
                    window.location.href = `details.html?movieId=${movie.id}`; // Redirect to the movie details page
                });
                
                // Append the movie card to the results container
                searchResultsContainer.appendChild(movieElement);
            }
        });
    }

    // Format release date
    function formatReleaseDate(dateString) {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // Search movies function
    function performSearch(query) {
        if (!query) {
            searchResultsContainer.innerHTML = "<p style='color: white; text-align: center;'>Please enter a search term.</p>";
            return;
        }

        // Reload the page with the search query in the URL
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }

    // Search button event listener
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        performSearch(query);
    });

    // Enter key event listener
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            performSearch(query);
        }
    });

    // Check if there's an initial query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");
    
    if (query) {
        searchInput.value = query;
        
        // Fetch and display movies based on the query
        fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.results);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                searchResultsContainer.innerHTML = "<p style='color: white; text-align: center;'>Something went wrong. Please try again later.</p>";
            });
    }
});
