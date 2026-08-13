const movies = [

  {
    id: 1,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },

  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
  },

  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },

  {
    id: 4,
    title: "Oppenheimer",
    year: 2023,
    rating: 8.6,
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
  },

  {
    id: 5,
    title: "Dune",
    year: 2021,
    rating: 8.0,
    genre: "Adventure",
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
  },

  {
    id: 6,
    title: "Arrival",
    year: 2016,
    rating: 7.9,
    genre: "Sci-Fi",
    poster: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg"
  },

  {
    id: 7,
    title: "The Martian",
    year: 2015,
    rating: 8.0,
    genre: "Adventure",
    poster: "https://image.tmdb.org/t/p/w500/5BHuvQ6p9kfc091vW4pVAF9Yb1w.jpg"
  },

  {
    id: 8,
    title: "Gone Girl",
    year: 2014,
    rating: 8.1,
    genre: "Thriller",
    poster: "https://image.tmdb.org/t/p/w500/lv5xShBIDPe7m4ufdlV0p3l6j6K.jpg"
  }

];


let watchlist =
  JSON.parse(
    localStorage.getItem("movieverse-watchlist")
  ) || [];



/* ================= DISCOVER ================= */

function displayMovies(list) {

  const grid =
    document.getElementById("movieGrid");

  grid.innerHTML = "";

  list.forEach(movie => {

    const saved =
      watchlist.includes(movie.id);

    grid.innerHTML += `

      <article class="movie-card">

        <div class="poster-wrapper">

          <img
            src="${movie.poster}"
            alt="${movie.title}"
            class="poster"
          >

          <span class="rating">
            ⭐ ${movie.rating}
          </span>

        </div>

        <div class="movie-info">

          <h3>
            ${movie.title}
          </h3>

          <p>
            ${movie.year} • ${movie.genre}
          </p>

          <button
            class="watch-btn"
            onclick="addToWatchlist(${movie.id})"
          >
            ${saved ? "♥ Saved" : "♡ Add to Watchlist"}
          </button>

        </div>

      </article>

    `;

  });

}


/* ================= TRENDING ================= */

function displayTrending() {

  const grid =
    document.querySelector(
      "#trending .movie-grid"
    );

  grid.innerHTML = "";

  const trending =
    [...movies]
      .sort(
        (a,b) => b.rating - a.rating
      )
      .slice(0,4);

  trending.forEach(movie => {

    const saved =
      watchlist.includes(movie.id);

    grid.innerHTML += `

      <article class="movie-card">

        <div class="poster-wrapper">

          <img
            src="${movie.poster}"
            alt="${movie.title}"
            class="poster"
          >

          <span class="rating">
            ⭐ ${movie.rating}
          </span>

        </div>

        <div class="movie-info">

          <h3>
            ${movie.title}
          </h3>

          <p>
            ${movie.year} • ${movie.genre}
          </p>

          <button
            class="watch-btn"
            onclick="addToWatchlist(${movie.id})"
          >
            ${saved ? "♥ Saved" : "♡ Add to Watchlist"}
          </button>

        </div>

      </article>

    `;

  });

}


/* ================= WATCHLIST ================= */

function displayWatchlist() {

  const grid =
    document.getElementById(
      "watchGrid"
    );

  const empty =
    document.getElementById(
      "emptyWatchlist"
    );

  grid.innerHTML = "";

  const savedMovies =
    movies.filter(movie =>
      watchlist.includes(movie.id)
    );


  document.getElementById("count")
    .textContent =
      savedMovies.length;


  if (savedMovies.length === 0) {

    empty.style.display = "block";

    return;

  }


  empty.style.display = "none";


  savedMovies.forEach(movie => {

    grid.innerHTML += `

      <article class="movie-card">

        <div class="poster-wrapper">

          <img
            src="${movie.poster}"
            alt="${movie.title}"
            class="poster"
          >

          <span class="rating">
            ⭐ ${movie.rating}
          </span>

        </div>

        <div class="movie-info">

          <h3>
            ${movie.title}
          </h3>

          <p>
            ${movie.year} • ${movie.genre}
          </p>

          <button
            class="watch-btn"
            onclick="addToWatchlist(${movie.id})"
          >
            ♥ Remove
          </button>

        </div>

      </article>

    `;

  });

}


/* ================= ADD WATCHLIST ================= */

function addToWatchlist(id) {

  if (watchlist.includes(id)) {

    watchlist =
      watchlist.filter(
        movieId => movieId !== id
      );

  } else {

    watchlist.push(id);

  }


  localStorage.setItem(
    "movieverse-watchlist",
    JSON.stringify(watchlist)
  );


  displayMovies(movies);
  displayTrending();
  displayWatchlist();

}


/* ================= FILTER ================= */

function filterMovies() {

  const search =
    document
      .getElementById("search")
      .value
      .toLowerCase();


  const genre =
    document
      .getElementById("genre")
      .value;


  const rating =
    Number(
      document
        .getElementById("rating")
        .value
    );


  const filtered =
    movies.filter(movie => {

      const matchesSearch =
        movie.title
          .toLowerCase()
          .includes(search);


      const matchesGenre =
        genre === "all" ||
        movie.genre === genre;


      const matchesRating =
        movie.rating >= rating;


      return (
        matchesSearch &&
        matchesGenre &&
        matchesRating
      );

    });


  displayMovies(filtered);

}


/* ================= SEARCH ================= */

document
  .getElementById("search")
  .addEventListener(
    "input",
    filterMovies
  );


document
  .getElementById("genre")
  .addEventListener(
    "change",
    filterMovies
  );


document
  .getElementById("rating")
  .addEventListener(
    "change",
    filterMovies
  );


/* ================= CHIPS ================= */

document
  .querySelectorAll(".chip")
  .forEach(chip => {

    chip.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".chip")
          .forEach(c =>
            c.classList.remove("active")
          );

        chip.classList.add("active");

        document
          .getElementById("genre")
          .value =
            chip.dataset.genre;

        filterMovies();

      }
    );

  });


/* ================= THEME ================= */

const themeBtn =
  document.getElementById(
    "themeBtn"
  );


themeBtn.addEventListener(
  "click",
  () => {

    document.body
      .classList
      .toggle("light");

    const light =
      document.body
        .classList
        .contains("light");

    themeBtn.textContent =
      light ? "☾" : "☀";

  }
);


/* ================= START ================= */

displayMovies(movies);

displayTrending();

displayWatchlist();