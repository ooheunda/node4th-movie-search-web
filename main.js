// TMDB top lated movie list API request code
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDU4MDE4M2IwNTRhMTE0ZTBkY2IyZjI2YjhhYzg2OCIsInN1YiI6IjY1OTQwYmE5ZTAwNGE2NmNlYzE4YTgzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6tjRb8Sif7JmOkbiAWtJp3uPTdQpKFL8WZF-fEu1jL0'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        let movies = response['results'];

        movies.forEach(movie => {
            makeMovieCard(movie);
            addIdAlertEvent(movie);
            document.getElementById('searchBtn').addEventListener("click", () => {
                searchMovie(movie);
            })
        })
    })
    .catch(err => console.error(err));

// 카드 객체 생성 함수
function makeMovieCard(movie) {
    let title = movie['title'];
    let overview = movie['overview'];
    let poster_path = movie['poster_path'];
    let vote_average = movie['vote_average'];
    let id = movie['id'];
    let adult = movie['adult'];

    let card_html = `
            <div class="movie-card" id="${id}">
                <div class="card h-100">
                    <img src="https://image.tmdb.org/t/p/w300${poster_path}" id="${id}-img" class="card-img-top" alt="poster image">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${overview}</p>
                    <p>${vote_average}</p>
                  </div>
                </div>
            </div>
            `;

    let element = document.getElementById('cards');
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
function searchMovie(movie) {
    let title = (movie['title']).toUpperCase();
    let searchStr = (document.getElementById('searchMovie').value).toUpperCase();
    const element = document.getElementById(`${movie['id']}`);

    if (title.includes(searchStr)) {
        element.style.display = "grid";
    } else {
        element.style.display = "none";
    }
}