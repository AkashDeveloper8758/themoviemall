require("dotenv").config();
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie/';
console.log('tmdb api : ',TMDB_API_KEY)

export const movieType = {
    UPCOMMING_MOVIES: "UPCOMMING_MOVIES",
    PLAYING_NOW: "PLAYING_NOW",
    POPULAR_NOW: "POPULAR_NOW",
    TOP_RATED: "TOP_RATED",
}

export const routeConstants = {
    TOP_RATED_ROUTE: '/top-rated',
    PLAYING_NOW_ROUTE: '/playingNow',
    POPULAR_ROUTE: '/popular',
    UPCOMMING_ROUTE: '/upcomming'
}

export const actionType = {
    SET_MOVIES: "set_movies",
    GET_MOVIES: "get_movies",
}


export const movieAPIS = {

    PLAYING_NOW_API: `${TMDB_BASE_URL}now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    POPULAR_NOW_API: `${TMDB_BASE_URL}popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    TOP_RATED_API: `${TMDB_BASE_URL}top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    UPCOMMING_MOVIE_API: `${TMDB_BASE_URL}upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=1`,


    MOVIE_DETAIL_API: `?api_key=${TMDB_API_KEY}&language=en-US`,
    MOVIE_VIDEO_API: `/videos?api_key=${TMDB_API_KEY}&language=en-US`,
    SIMILAR_MOVIES_API: `/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`,

    OMDB_API: `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`,
    TEST_DRIVE_API: `https://tastedive.com/api/similar?info=1&limit=5&q=`,

    IMAGE_BASE_PATH:'http://image.tmdb.org/t/p/w400'
}