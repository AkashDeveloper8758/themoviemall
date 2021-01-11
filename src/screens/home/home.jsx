import React, { useState, useEffect, useContext, Fragment } from "react";
import MainPoster from "./components/posterComponent";

import { Link } from "react-router-dom";
import { movieAPIS, movieType, routeConstants } from "../../defaultConstants";
import "../../index.css";
import MovieGrid from "./components/movieGrid";
import { GlobalContext } from "../../GlobalStates";
import {useHistory} from 'react-router-dom'

function HomeScreen() {
  // playing now *
  // latest
  // upcomming
  // top rated *



  const [playingNowMovies, setPlayingNowMovies] = useState([]);
  const [upcomingMovies, setUpcomingNowMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const history = useHistory()
  // const [isLoading, setIsLoading] = useState(false);

  const { moviesGlobal, setMoviesAction } = useContext(GlobalContext);
  const fetchArrayUrls = [
    movieAPIS.UPCOMMING_MOVIE_API,
    movieAPIS.PLAYING_NOW_API,
    movieAPIS.POPULAR_NOW_API,
    movieAPIS.TOP_RATED_API,
  ];
  const HeadingElement = ({ heading, url }) => {
    return (
      <div className="heading mt-8">
        <Link to={url}>{heading}</Link>
      </div>
    );
  };

  const movieTypeToApiMaping = (url, movies) => {
    switch (url) {
      case movieAPIS.POPULAR_NOW_API:
        setPopularMovies(movies);
        return movieType.POPULAR_NOW;

      case movieAPIS.UPCOMMING_MOVIE_API:
        setUpcomingNowMovies(movies);
        return movieType.UPCOMMING_MOVIES;

      case movieAPIS.TOP_RATED_API:
        setTopRatedMovies(movies);
        return movieType.TOP_RATED;

      case movieAPIS.PLAYING_NOW_API:
        setPlayingNowMovies(movies);
        return movieType.PLAYING_NOW;
      default:
        return movieType.LATEST_MOVIES;
    }
  };
  function fetchMovieFromResult(moviesResult) {
    history.replace('/')
    var movieItems = [];
    moviesResult.forEach((item) => {
      var posterPath = "http://image.tmdb.org/t/p/w400" + item["poster_path"];
      var id = item["id"];
      var title = item["original_title"];
      var overview = item["overview"];
      var backDropPath =
        "http://image.tmdb.org/t/p/w500" + item["backdrop_path"];
      var releaseDate = item["release_date"];
      var rating = item["vote_average"];
      movieItems.push({
        id,
        title,
        overview,
        backDropPath,
        releaseDate,
        rating,
        posterPath,
      });
    });
    return movieItems;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchArrayUrls.forEach(async (url) => {
          console.log('fetch url : ',url)
          const globalExist = moviesGlobal[movieTypeToApiMaping(url, [])];
          if (globalExist !== undefined) {
            // console.log('exist data for: ',globalExist)
            movieTypeToApiMaping(url, globalExist);
            return;
          } else console.log("new fetch");
          const movieRes = await fetch(url);
          const movieJson = await movieRes.json();
          const moviesList = movieJson["results"];
          var movieItems = fetchMovieFromResult(moviesList);
          var movieTypeData = movieTypeToApiMaping(url, movieItems);

          await setMoviesAction(movieTypeData, movieItems);
          if (movieTypeData === movieType.UPCOMMING_MOVIES) {
            console.log("store movies for: ", moviesGlobal[movieTypeData]);
          }
        });
        // setIsLoading(false);
      } catch (error) {
        console.log("error while fetch : ", error);
        // setIsLoading(false);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("is loading is: ", isLoading);

  return (
    <Fragment>
      <div>
        <MainPoster
          moviePoster={
            playingNowMovies === undefined ? undefined : playingNowMovies[0]
          }
        />
        <div className="mx-8 my-4">
          <HeadingElement
            heading={"Upcomming >>"}
            url={routeConstants.UPCOMMING_ROUTE}
          />
          <MovieGrid movies={upcomingMovies && upcomingMovies.slice(0, 5)} />

          <HeadingElement
            heading={"Playing Now >>"}
            url={routeConstants.PLAYING_NOW_ROUTE}
          />
          <MovieGrid
            movies={playingNowMovies && playingNowMovies.slice(0, 5)}
          />

          <HeadingElement
            heading={"Popular >>"}
            url={routeConstants.POPULAR_ROUTE}
          />
          <MovieGrid movies={popularMovies && popularMovies.slice(1, 6)} />

          <HeadingElement
            heading={"Top Rated >>"}
            url={routeConstants.TOP_RATED_ROUTE}
          />
          <MovieGrid movies={topRatedMovies && topRatedMovies.slice(3, 8)} />
        </div>
      </div>
    </Fragment>
  );
}

export default HomeScreen;
