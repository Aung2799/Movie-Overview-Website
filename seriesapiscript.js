const apiKey = "3a11b286a45ec4d0851c4e9464be0c8f";

async function fetchTVShowData() {
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch TV show data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching TV show data:", error.message);
    return [];
  }
}

async function populateTVShowGrid() {
  const tvShowGrid = document.getElementById("tvShowGrid");

  const tvShows = await fetchTVShowData();

  tvShows.forEach((tvShow) => {
    const tvShowElement = document.createElement("div");
    tvShowElement.classList.add("tv-show");

    const tvShowLink = document.createElement("a");
    tvShowLink.href = `https://www.themoviedb.org/tv/${tvShow.id}`;
    tvShowLink.target = "_blank";
    tvShowLink.setAttribute("title", tvShow.name);
    tvShowLink.setAttribute("aria-label", tvShow.name);

    const posterImage = document.createElement("img");
    posterImage.src = `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`;
    posterImage.alt = tvShow.name;

    tvShowLink.appendChild(posterImage);

    tvShowElement.appendChild(tvShowLink);

    const tvShowTitle = document.createElement("div");
    tvShowTitle.classList.add("tv-show-title");
    tvShowTitle.textContent = `${tvShow.name} (${tvShow.first_air_date})`;
    tvShowElement.appendChild(tvShowTitle);

    tvShowGrid.appendChild(tvShowElement);
  });
}

window.onload = populateTVShowGrid;