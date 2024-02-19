const main = document.getElementById('main');

async function loadMoviesFromJSON() {
  try {
    const response = await fetch('datos.json');
    const movies = await response.json();
    showMovies(movies);
  } catch (error) {
    console.error('Error loading movies:', error);
  }
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, image, rating, description, enlace } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${image}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(rating)}">${rating}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${description}<br>
        <a href="${enlace}" class="ver-ahora" target="_blank">Ver ahora</a>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(rating) {
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function searchMovies(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('search').value.trim().toLowerCase();

  if (searchTerm && searchTerm !== '') {
    filterMovies(searchTerm);
  } else {
    loadMoviesFromJSON();
  }
  nav.forEach(nav_el => nav_el.classList.remove('visible'));
}

document.getElementById('about-link').addEventListener('click', function() {
  nav.forEach(nav_el => nav_el.classList.remove('visible'));
});

document.getElementById('support-link').addEventListener('click', function() {
  nav.forEach(nav_el => nav_el.classList.remove('visible'));
});


function filterMovies(searchTerm) {
  fetch('datos.json')
    .then((response) => response.json())
    .then((data) => {
      const filteredMovies = data.filter(movie => movie.title.trim().toLowerCase().includes(searchTerm));
      showMovies(filteredMovies);
      scrollAndHighlightFirstMovie();
    })
    .catch((error) => console.error('Error fetching movies:', error));
}

function scrollAndHighlightFirstMovie() {

  const firstMovie = document.querySelector('.movie');
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  if (firstMovie) {
    firstMovie.scrollIntoView();
    firstMovie.classList.add('highlight');
    about.style.display = "none"; 

    if (mediaQuery.matches) {
      firstMovie.style.width = '100%';  
    } else {
      firstMovie.style.width = 'calc(3 * 180px - 3 * 10px)';
    }
  }
}

window.addEventListener('load', loadMoviesFromJSON);

const form = document.getElementById('form');
form.addEventListener('submit', searchMovies);


  function reloadPage() {
    location.reload();
    window.scrollTo(0, 0);
  }
  
  

 




 