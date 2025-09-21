function populateGenres() {
  const apiKey = "API_KEY";
  const movieApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
  const tvApiUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`;

  fetch(movieApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch movie genres");
      }
      return response.json();
    })
    .then((movieData) => {
      const movieGenres = movieData.genres.map((genre) => genre.name);

      const dropdownContent = document.querySelector(".genre-dropdown-content");
      movieGenres.forEach((genre) => {
        const genreLink = document.createElement("a");
        genreLink.textContent = genre;
        genreLink.href = `movies.html?genre=${genre}`;
        dropdownContent.appendChild(genreLink);
      });
    })
    .catch((error) => {
      console.error("Error fetching movie genres:", error);
    });

  fetch(tvApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch TV genres");
      }
      return response.json();
    })
    .then((tvData) => {
      const tvGenres = tvData.genres.map((genre) => genre.name);

      const dropdownContent = document.querySelector(".genre-dropdown-content");
      tvGenres.forEach((genre) => {
        const genreLink = document.createElement("a");
        genreLink.textContent = genre;
        genreLink.href = `tvshows.html?genre=${genre}`;
        dropdownContent.appendChild(genreLink);
      });
    })
    .catch((error) => {
      console.error("Error fetching TV genres:", error);
    });
}

populateGenres();

