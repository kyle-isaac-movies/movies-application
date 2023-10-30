
// get all movies

export async function getMovieInfo() {
    return fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(movies => movies)
        .catch(error => console.error(error));
}

// add movie
export const addMovie = async (movie) => {
    try {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const newMovie = await response.json();
        return newMovie;
    } catch (error) {
        console.error(error);
    }
}


// update movie
export const updateMovie = async (id, movie) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const updatedMovie = await response.json();
        return updatedMovie;
    } catch (error) {
        console.error(error);
    }
}

//delete movie
export const deleteMovie = async (id) => {
    try {
        const url = `http://localhost:3000/movies/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        await response.json();
    } catch (error) {
        console.error(error);
    }
}