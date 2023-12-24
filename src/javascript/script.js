let pageno = 1 ;
// const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${pageno}`
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${pageno}`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const addMore = document.getElementById("addMore");
 main.innerHTML = '';
addMore.addEventListener("click" ,addMoreFunction)
getMovies(API_URL)


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(url);

    showMovies(data.results)
}
function getClassByRate(vote_average) {
    if (vote_average >= 8) {
        return 'green'
    }
    else if (vote_average >= 5) {
        return 'orange'
    }
    else {
        return 'red'
    }
}

function showMovies(movies) {
    // main.innerHTML = '';
    // console.log(movies);
    movies.forEach((movie) => {
        // console.log(movie);
        // const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =        
        `
        <img src="${IMG_PATH + movie.poster_path}" alt="${movie.original_title}">
        <div class="movie-info">
            <h3>${movie.original_title}</h3>
            <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
           ${movie.overview}
          </div>
        `
        main.appendChild(movieEl)

    });
}
function addMoreFunction(){
    pageno++;
    console.log(pageno);
    getMovies(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${pageno}`);

}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    main.innerHTML = '';
    document.getElementById("LoadMore").remove();
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    }
    else {
        window.location.reload()
    }
})