
let movies = [
    { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8 },
    { id: 2, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9 },
    { id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi",rating: 9 },
    { id: 4, title: "Parasite", year: 2019, genre: "Thriller", rating: 8 },
    { id: 5, title: "Whiplash", year: 2014, genre: "Drama", rating: 9 }
];

let genres = loadGenres()
let displayedMovies = [];
let sortDirection = '';

const moviesSection = document.getElementById('movies-section');
const drop = document.getElementById('gDrop');

displayedMovies = movies;
showMovies();
drawGenreOptions();


function filterByGenre(){
    const iValue = document
    .getElementById('iGenre').value;

    if (!iValue || iValue == ''){
        displayedMovies = movies;
        showMovies();
        return;
    }

    let filterMovies = movies
    .filter(movie => 
        movie.genre.toUpperCase().includes(iValue.toUpperCase()));
    displayedMovies = filterMovies;
    showMovies();
}

function findByTitle(){
    const iValue = document
    .getElementById('iTitle').value;

    if (!iValue || iValue == ''){
        alert("Input Invalido")
        return;
    }

    let findedMovie = movies
        .find(m => m.title.toUpperCase() == iValue.toUpperCase())
    displayedMovies = [findedMovie];
    showMovies()
}

function decreaseRating(id){
    let currentRating = movies.find(f => f.id == id).rating;
    if (currentRating > 0){
        movies.find(f => f.id == id).rating--;
    }
    showMovies()
}

function createMovie(){
    let iTitle = document.getElementById('icTitle').value;
    let iYear = document.getElementById('icYear').value;
    let iGenre = document.getElementById('icGenre').value;

    if (!iTitle || !iYear || !iGenre){
        alert("Todos os campos sao obrigatorios")
        return;
    }

    var newMovie = {
        id: nextMovieId(),
        title: iTitle,
        year: iYear,
        genre: iGenre,
        rating: 0
    }

    movies.push(newMovie);
    displayedMovies = movies;
    showMovies()
}

function deleteMovie(id) {
    movies = movies.filter(f => f.id != id);
    displayedMovies = movies;
    showMovies()
}

function nextMovieId(){
    let ids = movies.map(i => i.id);
    let bigger = Math.max(...ids);
    return bigger + 1;
}

function increaseRating(id){
    let currentRating = movies.find(f => f.id == id).rating;
    if (currentRating < 10){
        movies.find(f => f.id == id).rating++;
    }
    showMovies()
}

function sortToLow(){
    sortDirection = 'down';
    showMovies()
}

function sortToHigh(){
    sortDirection = 'up';
    showMovies()
}

function showMovies(){
    if (sortDirection == 'up'){
        displayedMovies = displayedMovies.sort((a, b) => b.rating - a.rating);
    }
    else if (sortDirection == 'down'){
        displayedMovies = displayedMovies.sort((a, b) => a.rating - b.rating);
    }

    moviesSection.innerHTML = '';
    displayedMovies.forEach(movie => {
        let movieCard = createMovieCard(movie);
        moviesSection.innerHTML += movieCard;
    })
}

function createMovieCard(movie) {
    let {id, title, year, genre, rating} = {...movie};
    let html = 
    `<div class="movie" id="m-${id}">
        <h1>${title}</h1>
        <div class="m-date-genre">
            <span>${year}</span>
            <span>${genre}</span>
        </div>
        <div>
            <span class="rating">${rating}</span>
            <span>
                <button onclick="decreaseRating(${id})">-</button>
                <button onclick="increaseRating(${id})">+</button>
            </span>
        </div>
        <button class="delB" onclick="deleteMovie(${id})">X</button>
    </div>`;

    return html;
}

drop.addEventListener('change', (e) => {
    console.log(drop.value)
    if (drop.value == ''){
        displayedMovies = movies;
        showMovies()
        return;
    }
    let filtered = movies
        .filter(m => m.genre.toUpperCase() == drop.value.toUpperCase())
    displayedMovies = filtered
    showMovies()
})

function drawGenreOptions(){
    genres.forEach(e => {
        let option = document.createElement('option');
        option.innerHTML = e;
        option.value = e;
        drop.appendChild(option);
    });
}

function loadGenres(){
    let genres = movies.map(m => m.genre);
    return new Set(genres);
}


/* function createMovieCard(movie) {
    let card = document.createElement('div');
    card.classList.add('movie');

    let title = document.createElement('h1');
    title.innerText = movie.title;

    card.appendChild(title);

    return card;
} */