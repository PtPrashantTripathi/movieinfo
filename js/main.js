document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let searchText = document.querySelector("#searchText").value;
    getMovies(searchText);
  });
});
// Get function
function get(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getMovies(searchText) {
  //make request to api using axios
  // Make a request for a user with a given ID
  get(
    "https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" +
      searchText,
  )
    .then(function (response) {
      let movies = response.results;
      console.log(movies);
      let output = "";
      movies.forEach((movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });
      document.querySelector("#movies").innerHTML = output;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function movieSelected(id) {
  window.location = "movie.html?movieId=" + id;
  return false;
}

function getMovie() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let movieId = urlParams.get("movieId");

  // Make a request for a user with a given ID
  get(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?api_key=98325a9d3ed3ec225e41ccc4d360c817",
  )
    .then(function (response) {
      let movie = response;
      console.log(movie);

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime} min.</li>
              <li class="list-group-item"><strong>Production Companies:</strong> ${movie.production_companies[0].name} min.</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
    `;

      document.querySelector("#movie").innerHTML = output;
    })
    .catch(function (error) {
      console.log(error);
    });
}
