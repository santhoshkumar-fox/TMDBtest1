


const API_KEY = "api_key=4bc80c4ca6a889536eb0c4937fc98253";
const BASE_API = 'https://api.themoviedb.org/3/'
const POP_URL = BASE_API + 'discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = BASE_API + 'search/movie?' +API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById("search");

getmovies(POP_URL);

async function getmovies(url){
try {
    
    const res = await fetch(url);
    if(res.status !== 200) throw new errorMonitor("Eroor found");
    const data =await res.json();
    console.log(data.results);
    showMovieTemp(data.results);

} catch (error) {
    console.log(error.message);
    
}

}
function showMovieTemp(data){

    main.innerHTML = '';


    data.forEach(movie => {

        const{title,poster_path,vote_average,overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `

        <img src="${IMG_BASE_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>OverViwe</h3>
                ${overview}
            </div>
        
        `
        main.appendChild(movieEl);
        
    });
}
function getColor(vote){
    if(vote >8){
        return 'green';
    }
    else if(vote >=7){
        return 'orange';
    }
    else{
        return 'red';
    }

}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const values = search.value;

    if(values){

        getmovies(SEARCH_URL +'&query='+values);
    }
});