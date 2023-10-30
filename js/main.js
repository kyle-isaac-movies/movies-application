import {addMovie, deleteMovie, getMovieInfo, updateMovie} from "./movies-api.js";
import {POSTER_IP} from "./keys.js"
let movies = [];

document.addEventListener("DOMContentLoaded", main);

async function main(){
    movies = await getMovieInfo();
    document.querySelector("#loader").classList.add("hideSpinner")

    displayMovies(movies)
    // console.log(await getPosterInfo("Blade Runner"))
    console.log(await getAddMovieInfo("Jumanji"))
}

let movieCardDisplay = document.querySelector("#movieCard")

function displayMovies(movies){
    movieCardDisplay.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        let cards = document.createElement("div");
        cards.classList.add("d-flex")
        let movieCard = makeMovieCard(movie)
        cards.appendChild(movieCard)
        movieCardDisplay.appendChild(cards)
    }
}
function makeMovieCard(movie){
    let card = document.createElement("div");
    card.classList.add("card", "mt-3", "separateCard");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `<h5 class="card-title">${movie.title}</h5><img alt="${movie.title}" src="${movie.movieUrl}"> <p>Rating: ${movie.rating}</p><p>Genre: ${movie.genre}</p><p class="card-text">Summary: ${movie.movieSummary}</p>`
    card.appendChild(cardBody)
    let footer = document.createElement("div")
    footer.classList.add("card-footer", "justify-content-evenly");
    footer.id = "foot";
    card.appendChild(footer)
    let editBtn = document.createElement("button")
    editBtn.innerHTML = "<i class=\"fa-solid fa-pen-to-square\" style=\"color: #faebd7;\"></i>"
    editBtn.classList.add("btn", "modifyBtn")
    editBtn.id="edit"
    editBtn.setAttribute("data-id", movie.id)
    editBtn.setAttribute("data-bs-toggle", "modal")
    editBtn.setAttribute("data-bs-target", "#staticBackdrop")
    editBtn.addEventListener("click", findUpdateCard)
    footer.appendChild(editBtn)
    let deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "<i class=\"fa-regular fa-trash-can\" style=\"color: #faebd7;\"></i>"
    deleteBtn.classList.add("btn", "modifyBtn")
    deleteBtn.id="delete"
    deleteBtn.setAttribute("data-id", movie.id)
    deleteBtn.addEventListener("click", deleteCard)
    footer.appendChild(deleteBtn)
    return card
}

// add Card

let addGenre = document.querySelector("#genre")
let addTitle = document.querySelector("#inputTitle")
let addRating = document.querySelector("#addRating")
let addSummary = document.querySelector("#addSummary")
let addButton = document.querySelector("#addMovie"); addButton.addEventListener("click", addMovieForm)
let formToggle = document.querySelector("#addBtn")
let addMovieFormData = document.querySelector("#addMovieForm")
// let closeForm = document.querySelector("#closeModal");

async function addMovieForm(e){
    e.preventDefault()
    let movieData = await getAddMovieInfo(addTitle.value)
    let movie = {
        title: addTitle.value,
        genre: movieData.genre,
        rating: addRating.value,
        movieSummary: movieData.movieSummary,
        movieUrl: movieData.movieUrl
    }
    addMovie(movie).then(r => r)
    addMovieFormData.reset()
    formToggle.click()
    movies = await getMovieInfo();
    displayMovies(movies)
}

//update card

let updateId = document.querySelector("#id")
let updateGenre = document.querySelector("#genre")
let updateUrl = document.querySelector("#movieUrl")
let updateTitle = document.querySelector("#editInputTitle")
let updateRating = document.querySelector("#editRating")
let updateSummary = document.querySelector("#updateSummary")
let closeForm = document.querySelector("#closeModal");

function getMovieFromMovieArray(movieID){
    for (let i = 0; i < movies.length; i++) {
        if(movieID == movies[i].id){
            return movies[i]
        }
    }
}


function findUpdateCard(){
    let movieID = this.getAttribute("data-id")
    let movie = getMovieFromMovieArray(movieID)
    populateEditForm(movie)
}

function populateEditForm(movie){
    updateId.value = movie.id;
    updateGenre.value = movie.genre;
    updateUrl.value = movie.movieUrl
    updateTitle.value = movie.title
    updateRating.value = movie.rating
    updateSummary.value = movie.movieSummary
}

let updateSubmit = document.querySelector("#submitUpdate").addEventListener("click", updateMovieForm)

async function updateMovieForm(){
    let movie = {
        id: updateId.value,
        title: updateTitle.value,
        genre: updateGenre.value,
        rating: updateRating.value,
        movieSummary: updateSummary.value,
        movieUrl:  await getPosterInfo(updateTitle.value)
    }
    updateMovie(movie.id, movie).then(r => r)
    closeForm.click()
    movies = await getMovieInfo();
    displayMovies(movies)
}

// Delete Card

async function deleteCard() {
    let movieID = this.getAttribute("data-id")
    deleteMovie(movieID).then(r => r)
    movies = await getMovieInfo();
    displayMovies(movies)
}

async function searchIt () {
    let searcher = document.getElementById('searchbar')
    let filter = searcher.value.toLowerCase()
    let newList = []
    let movies = await getMovieInfo();
    movies.forEach(function(movies) {
        let searchMovies = movies.title.toLowerCase()
        let x = searchMovies.includes(filter)
        if (x) {
            newList.push(movies)
            displayMovies(newList)
        }
    })
}
document.addEventListener('DOMContentLoaded', function() {
    let searchBar = document.getElementById('searchbar');
    searchBar.addEventListener('keyup', searchIt);
});

    // poster request
export async function getPosterInfo(movieTitle) {
    return fetch(`https://www.omdbapi.com/?apikey=${POSTER_IP}&t=${movieTitle}`)
        .then( response => response.json())
        .then(data => {
           let movieUrl = data.Poster
            return movieUrl
        })
        .catch(error => console.error(error));
}

export async function getAddMovieInfo(movieTitle) {
    return fetch(`https://www.omdbapi.com/?apikey=${POSTER_IP}&t=${movieTitle}`)
        .then( response => response.json())
        .then(data => {
           let movie = {
               movieSummary: data.Plot,
               genre: data.Genre,
                movieUrl: data.Poster
            }
            return movie
        })
        .catch(error => console.error(error));
}