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
        console.log(movies);
        movies.forEach(movie => makeMovieCards(movie));
    })
    .catch(err => console.error(err));

// 카드 생성 함수
function makeMovieCards(movie) {
    let title = movie['title'];
    let overview = movie['overview'];
    let poster_path = movie['poster_path'];
    let vote_average = movie['vote_average'];

    let card_html = `
    <div class="col">
        <div class="card h-100">
            <img src="https://image.tmdb.org/t/p/w300${poster_path}" class="card-img-top" alt="poster image">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${overview}</p>
                <p>${vote_average}</p>
            </div>
        </div>
    </div>
    `;

    document.getElementById('cards').innerHTML += card_html;
}