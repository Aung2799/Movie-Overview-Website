const searchBar = document.getElementById("searchBar");
const dropdownContent = document.getElementById("dropdownContent");

let genres = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchGenres();
});

searchBar.addEventListener("input", function (event) {
  event.preventDefault();

  const searchQuery = searchBar.value;

  if (searchQuery && searchQuery.length >= 3) {
    
    const genre = genres.find(g => g.name.toLowerCase() === searchQuery.toLowerCase());

    if (genre) {
      const genreId = genre.id;
      const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=API_KEY&with_genres=${genreId}`;
      const tvShowUrl = `https://api.themoviedb.org/3/discover/tv?api_key=API_KEY&with_genres=${genreId}`;

      Promise.all([
        fetch(movieUrl).then((response) => response.json()),
        fetch(tvShowUrl).then((response) => response.json())
      ]).then(([movieData, tvShowData]) => {
        const combinedResults = [...movieData.results, ...tvShowData.results];
        updateDropdown(combinedResults);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    } else {
      
      const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=3a11b286a45ec4d0851c4e9464be0c8f&query=${searchQuery}`;
      const tvShowUrl = `https://api.themoviedb.org/3/search/tv?api_key=3a11b286a45ec4d0851c4e9464be0c8f&query=${searchQuery}`;

      Promise.all([
        fetch(movieUrl).then((response) => response.json()),
        fetch(tvShowUrl).then((response) => response.json())
      ]).then(([movieData, tvShowData]) => {
        const combinedResults = [...movieData.results, ...tvShowData.results];
        updateDropdown(combinedResults);
      }).catch((error) => {
        console.error("Error fetching data:", error);
      });
    }
  } else {
    dropdownContent.style.display = "none";
  }
});

function fetchGenres() {
  const movieGenresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=3a11b286a45ec4d0851c4e9464be0c8f`;
  const tvGenresUrl = `https://api.themoviedb.org/3/genre/tv/list?api_key=3a11b286a45ec4d0851c4e9464be0c8f`;

  Promise.all([
    fetch(movieGenresUrl).then(response => response.json()),
    fetch(tvGenresUrl).then(response => response.json())
  ]).then(([movieGenresData, tvGenresData]) => {
    genres = [...movieGenresData.genres, ...tvGenresData.genres];
  }).catch((error) => {
    console.error("Error fetching genres:", error);
  });
}

function updateDropdown(results) {
  dropdownContent.innerHTML = "";

  if (results.length > 0) {
    results.forEach((result) => {
      const dropdownItem = document.createElement("div");
      dropdownItem.classList.add("dropdown-item");

      const imageElement = document.createElement("img");
      imageElement.src = `https://image.tmdb.org/t/p/w92${result.poster_path}`;
      imageElement.alt = result.title || result.name; 
      dropdownItem.appendChild(imageElement);

      const titleElement = document.createElement("span");
      titleElement.textContent = result.title || result.name; 
      dropdownItem.appendChild(titleElement);

      dropdownItem.addEventListener("click", function () {
        searchBar.value = result.title || result.name; 

        dropdownContent.style.display = "none";

        if (result.title) {
          window.location.href = `https://www.themoviedb.org/movie/${result.id}`;
        } else {
          window.location.href = `https://www.themoviedb.org/tv/${result.id}`;
        }
      });

      dropdownContent.appendChild(dropdownItem);
    });

    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }

}
