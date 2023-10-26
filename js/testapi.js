import * as test from "./movies-api.js"
import {addMovie} from "./movies-api.js";


document.addEventListener("DOMContentLoaded", main);

async function main(){
    console.log(await test.getMovieInfo())
}
const movie = {
    title: 'avengers',
    rating: '3'
}
// const newMovie = await addMovie({movie});
// console.log(newMovie);

