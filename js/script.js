//  THE MOVIE DATABASE > single page application

// 1) base api information
const API = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTUyMzY5N2I4OWYyNjVmMTk4OGIyM2E5MDg0MzEwOSIsIm5iZiI6MTc1OTc0OTkzMi40ODg5OTk4LCJzdWIiOiI2OGUzYTcyYzAzMDZkMzYzMzBjMjJhMGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RdSvNJUTAxgkfwvIAH2b_SMRDTU83MYhSCc6PKbRHBA";

// 2) api endpoints th e categories
const endpoints = {
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

// 3) select HTML elements
const movieList = document.querySelector("#movieList");
const template = document.querySelector("#movieCardTemplate");
const menu = document.querySelector("#menu");
const statusMessage = document.querySelector("#status");

// 4) fetch movies from the API
async function getMovies(type = "now_playing") {
  // small status message while loading
  statusMessage.textContent = "loading movies...<3";

  try {
    // build the complete API URL based on selected type
    const url = `${API}${endpoints[type]}?language=en-US&page=1`;

    // send the request with headers
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: TOKEN,
      },
    });

    // handle HTTP errors
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    // parse JSON response
    const data = await res.json();

    // render movie cards
    renderMovies(data.results);

    // update status with a human readable category + count
    statusMessage.textContent = `Showing ${type.replace("_", " ")} (${data.results.length} movies)`;
  } catch (err) {
    // log the error and show message
    console.error(err);
    statusMessage.textContent = "woops :(";
  }
}

// 5) render movie cards on the page
function renderMovies(movies) {
  // clear the previous movie list
  movieList.innerHTML = "";
  //   time for the fragment
  const fragment = document.createDocumentFragment();
  // loop through each movie
  movies.forEach((movie) => {
    // clone the html template
    const clone = template.content.cloneNode(true);
    // fill the template with data
    clone.querySelector(".movie_title").textContent = movie.title;
    clone.querySelector(".description").textContent = movie.overview;
    clone.querySelector(".original_title").textContent = movie.original_title;
    clone.querySelector(".release_date").textContent = movie.release_date;
    clone.querySelector("img").src = movie.poster_path ? `${IMAGE}${movie.poster_path}` : "";
    clone.querySelector("img").alt = movie.title;
    // adding the now filled card to the fragment
    fragment.appendChild(clone);
  });
  movieList.appendChild(fragment);
}

// 6) highlight the active link
function setActiveLink(type) {
  const links = menu.querySelectorAll("a");
  links.forEach((a) => a.classList.remove("active"));
  const current = menu.querySelector(`[data-type="${type}"]`);
  if (current) current.classList.add("active");
}

// 7) handle menu clicks
menu.addEventListener("click", (e) => {
  // check if the click was on a link
  const link = e.target.closest("a");
  // if not do nothing
  if (!link) return;
  // prevent the page from reloading
  e.preventDefault();

  // get the movie category from data-type
  const type = link.dataset.type;
  // update the menu styling
  setActiveLink(type);
  // fetch and display movies for that category
  getMovies(type);
});
getMovies("now_playing");
setActiveLink("now_playing");
