const apiKey = "3a11b286a45ec4d0851c4e9464be0c8f";

async function fetchMovieData() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
    return [];
  }
}

async function populateMovieGrid() {
  const movieGrid = document.getElementById("movieGrid");

  const movies = await fetchMovieData();

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const movieLink = document.createElement("a");
    movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;
    movieLink.target = "_blank";
    movieLink.setAttribute("title", movie.title);
    movieLink.setAttribute("aria-label", movie.title);

    const posterImage = document.createElement("img");
    posterImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    posterImage.alt = movie.title;

    movieLink.appendChild(posterImage);

    movieElement.appendChild(movieLink);

    const movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.textContent = `${movie.title} (${movie.release_date})`;
    movieElement.appendChild(movieTitle);

    movieGrid.appendChild(movieElement);
  });
}

window.onload = populateMovieGrid;
