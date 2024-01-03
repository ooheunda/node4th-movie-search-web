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
    .then(response => console.log(response))
    .catch(err => console.error(err));