import {addMovie, deleteMovie, getMovieInfo, updateMovie} from "./movies-api.js";

let movies = [];

document.addEventListener("DOMContentLoaded", main);

async function main(){
    movies = await getMovieInfo();
    document.querySelector("#loader").classList.add("hideSpinner")

    displayMovies(movies)

}

let movieCardDisplay = document.querySelector("#movieCard")


// add card
// function displayMovies(movies){
//     movieCard.innerHTML = "";
//
//     for (let i = 0; i < movies.length; i++) {
//         let movie = movies[i]
//         let card = document.createElement("div");
//         card.classList.add("d-flex")
//         card.innerHTML = `<div class="card mt-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">${movie.title}</h5><p>Rating: ${movie.rating}</p><p class="card-text">Summary: ${movie.movieSummary}</p><button data-id="${movie.id}" class="btn btn-warning editBtns" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">edit</button><button data-id="${movie.id}" class="btn btn-danger" type="button">delete</button></div></div>`
//         movieCard.appendChild(card)
//         // document.querySelector(".editBtn").addEventListener("click")
//     }
//
// }

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
    card.classList.add("card", "mt-3");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `<h5 class="card-title">${movie.title}</h5><p>Rating: ${movie.rating}</p><p>Genre: ${movie.genre}</p><p class="card-text">Summary: ${movie.movieSummary}</p>`
    card.appendChild(cardBody)
    let editBtn = document.createElement("button")
    editBtn.classList.add("btn", "btn-warning")
    editBtn.setAttribute("data-id", movie.id)
    editBtn.setAttribute("data-bs-toggle", "modal")
    editBtn.setAttribute("data-bs-target", "#staticBackdrop")
    editBtn.addEventListener("click", findUpdateCard)
    card.appendChild(editBtn)
    let deleteBtn = document.createElement("button")
    deleteBtn.classList.add("btn", "btn-danger")
    deleteBtn.setAttribute("data-id", movie.id)
    deleteBtn.addEventListener("click", deleteCard)
    card.appendChild(deleteBtn)
    return card
}

// add Card

let addGenre = document.querySelector("#genre")
let addTitle = document.querySelector("#inputTitle")
let addRating = document.querySelector("#addRating")
let addSummary = document.querySelector("#addSummary")
document.querySelector("#addMovie").addEventListener("click", addMovieForm)
let addMovieFormData = document.querySelector("#addMovieForm")
// let closeForm = document.querySelector("#closeModal");

async function addMovieForm(e){
    e.preventDefault()
    let movie = {
        title: addTitle.value,
        genre: addGenre.value,
        rating: addRating.value,
        movieSummary: addSummary.value
    }
    addMovie(movie).then(r => r)
    addMovieFormData.reset()
    movies = await getMovieInfo();
    displayMovies(movies)
}

//update card

let updateId = document.querySelector("#id")
let updateGenre = document.querySelector("#genre")
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
        movieSummary: updateSummary.value
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