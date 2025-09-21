const apiKey = "3a11b286a45ec4d0851c4e9464be0c8f";

async function fetchTVShowData(sortBy = 'popularity.desc') {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=${sortBy}&page=1`;

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
  const tvshowGrid = document.getElementById("tvshowGrid");

  try {
    // Fetch TV show data sorted by popularity
    const tvshows = await fetchTVShowData('popularity.desc');
    // Or fetch TV show data sorted by release date
    // const tvshows = await fetchTVShowData('first_air_date.desc');

    tvshows.forEach((tvshow) => {
      const tvshowElement = document.createElement("div");
      tvshowElement.classList.add("tvshow");

      const tvshowLink = document.createElement("a");
      tvshowLink.href = `https://www.themoviedb.org/tv/${tvshow.id}`;
      tvshowLink.target = "_blank";
      tvshowLink.setAttribute("title", tvshow.name);
      tvshowLink.setAttribute("aria-label", tvshow.name);

      const posterImage = document.createElement("img");
      posterImage.src = `https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`;
      posterImage.alt = tvshow.name;

      tvshowLink.appendChild(posterImage);

      tvshowElement.appendChild(tvshowLink);

      const tvshowTitle = document.createElement("div");
      tvshowTitle.classList.add("tvshow-title");
      tvshowTitle.textContent = `${tvshow.name} (${tvshow.first_air_date})`;
      tvshowElement.appendChild(tvshowTitle);

      tvshowGrid.appendChild(tvshowElement);
    });
  } catch (error) {
    console.error("Error populating TV show grid:", error.message);
  }
}

window.onload = populateTVShowGrid;