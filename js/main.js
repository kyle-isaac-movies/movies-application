import {getMovieInfo} from "./movies-api.js";

let movies = [];

document.addEventListener("DOMContentLoaded", main);

async function main(){
    toggleLoadingMessage(true);
    movies = await getMovieInfo();
    toggleLoadingMessage(false);

    displayMovies(movies)


}

function toggleLoadingMessage(show){
    if(show) {
        document.querySelector().classList.remove("")
    } else {
        document.querySelector().classList.add("")
    }
}

function displayMovies(movies){
    for (let i = 0; i < movies.length; i++) {
        let movieCard = generateCards(movies[i]);
        #.appendChild(movieCard)
    }
}

function generateCards(){

}
