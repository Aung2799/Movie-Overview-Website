const searchBar = document.getElementById("searchBar");
const dropdownContent = document.getElementById("dropdownContent");

searchBar.addEventListener("input", function (event) {
  event.preventDefault();

  const searchQuery = searchBar.value;

  if (searchQuery && searchQuery.length >= 3) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=3a11b286a45ec4d0851c4e9464be0c8f&query=${searchQuery}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        updateDropdown(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  } else {
    dropdownContent.style.display = "none";
  }
});

function updateDropdown(results) {
  dropdownContent.innerHTML = "";

  if (results.length > 0) {
    results.forEach((movie) => {
      const dropdownItem = document.createElement("div");
      dropdownItem.classList.add("dropdown-item");

      const imageElement = document.createElement("img");
      imageElement.src = `https://image.tmdb.org/t/p/w92${movie.poster_path}`;
      imageElement.alt = movie.title;
      dropdownItem.appendChild(imageElement);

      const titleElement = document.createElement("span");
      titleElement.textContent = movie.title;
      dropdownItem.appendChild(titleElement);

      dropdownItem.addEventListener("click", function () {
        searchBar.value = movie.title;

        dropdownContent.style.display = "none";

        window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
      });

      dropdownContent.appendChild(dropdownItem);
    });

    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
}
