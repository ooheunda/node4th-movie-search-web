const TMDB_API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2UzYzEzYmMxYjMwZWNlZjk2MjJmMjU2YzMzMDA2MSIsInN1YiI6IjY1OTQwYmE5ZTAwNGE2NmNlYzE4YTgzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QQnt5zCSJaCrwSrEPY021o0R2l6mnm3IkuJqQ5ddCAQ';
// TMDB top lated movie list API request code
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: TMDB_API_KEY
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        let movies = response['results'];

        movies.forEach(movie => {
            makeMovieCard(movie);
            addIdAlertEvent(movie);
        })

        document.getElementById('searchMovie').addEventListener("keyup", () => {
            searchMovie(movies);
        })
    })
    .catch(err => console.error(err));

// 카드 생성 함수
function makeMovieCard(movie) {
    let title = movie['title'];
    let overview = movie['overview'];
    let poster_path = movie['poster_path'];
    let vote_average = movie['vote_average'];
    let id = movie['id'];
    let adult = movie['adult'];

    let card_html = `
            <div class="movie-card" id="${id}">
                <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="${id}-img" class="poster" alt="poster image">
                <div class="card-body">
                    <div class="card-title"><a href="https://www.themoviedb.org/movie/${id}" target="blank">${title}</a></div>
                    <p class="overview">${overview}</p>
                    <p class="vote-average">${vote_average}</p>
                </div>
            </div>
            `;

    let element = document.getElementById('cardBox');
    element.insertAdjacentHTML('beforeend', card_html);
}

// 카드 이미지 클릭 시 Alert
function addIdAlertEvent(movie) {
    let imgElement = document.getElementById(`${movie['id']}-img`);
    imgElement.addEventListener("click", () => {
        window.alert("영화 id: " + movie['id']);
    });
}

// title로 검색
function searchMovie(movies) {
    movies.forEach(movie => {
        let title = (movie['title']).toUpperCase();
        let searchStr = (document.getElementById('searchMovie').value).toUpperCase();
        let element = document.getElementById(`${movie['id']}`);

        if (title.includes(searchStr)) {
            element.style.display = "grid";
        } else {
            element.style.display = "none";
        }
    })
}