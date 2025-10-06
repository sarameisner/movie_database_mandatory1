// here we can't select / use the categories .. but this was my first solution to the assignment

async function moviesData() {
  const URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTUyMzY5N2I4OWYyNjVmMTk4OGIyM2E5MDg0MzEwOSIsIm5iZiI6MTc1OTc0OTkzMi40ODg5OTk4LCJzdWIiOiI2OGUzYTcyYzAzMDZkMzYzMzBjMjJhMGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RdSvNJUTAxgkfwvIAH2b_SMRDTU83MYhSCc6PKbRHBA",
    },
  };

  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error(`Fetch status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    movieCards(data.results);
  } catch (error) {
    console.error(error.message);
  }
}

function movieCards(movies) {
  const movieTemplate = document.querySelector("#movieCardTemplate");
  const movieList = document.querySelector("#movieList");

  movieList.innerHTML = "";
  const fragmentMovies = document.createDocumentFragment();
  movies.forEach((movie) => {
    const clone = movieTemplate.content.cloneNode(true);
    clone.querySelector(".movie_title").textContent = movie.title;
    console.log(movie.title);
    clone.querySelector(".description").textContent = movie.overview;
    clone.querySelector(".original_title").textContent = movie.original_title;
    clone.querySelector(".release_date").textContent = movie.release_date;
    clone.querySelector("img").src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";

    fragmentMovies.appendChild(clone);
  });
  movieList.appendChild(fragmentMovies);
}

moviesData();
