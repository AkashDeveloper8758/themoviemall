import React, { useState, useEffect } from "react";
import "../../index.css";
// import imageTest from "../../images/blackWidow.jpeg";
import MovieItem from "../home/components/movieItem";
import { movieAPIS, TMDB_BASE_URL } from "../../defaultConstants";

function MovieDetail({ movieId }) {
  const [isLoading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState({
    gernes: [],
    rating: 0,
    productionCompanies: [],
  });
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isMoreActive, setMoveActive] = useState(false);

  async function fetchMovieFromResult(moviesResult) {
    var posterPath =
      "http://image.tmdb.org/t/p/w400" + moviesResult["poster_path"];
    var id = moviesResult["id"];
    var title = moviesResult["original_title"];
    var overview = moviesResult["overview"];
    var backDropPath =
      "http://image.tmdb.org/t/p/w500" + moviesResult["backdrop_path"];
    var releaseDate = moviesResult["release_date"];
    var rating = moviesResult["vote_average"];
    var gernes = moviesResult["genres"];
    var tagline = moviesResult["tagline"];
    var imdb_id = moviesResult["imdb_id"];
    var productionCompanies = moviesResult["production_companies"];
    var productionCountry = moviesResult["production_countries"];

    const fetchVideo = TMDB_BASE_URL + id + movieAPIS.MOVIE_VIDEO_API;
    var youtubeUrl;
    try {
      var res = await fetch(fetchVideo);

      var response = await res.json();
      console.log("video response : ", response);
      const videoKey = response["results"][0]["key"];
      youtubeUrl =
        "https://www.youtube-nocookie.com/embed/" +
        videoKey +
        "?autoplay=0&showinfo=0&controls=0";
      console.log("youtube url ", youtubeUrl);
    } catch (error) {
      console.log("error while testDrive api, movie detail fetch : ", error);
    }

    return {
      id,
      imdb_id,
      gernes,
      tagline,
      productionCompanies,
      productionCountry,
      youtubeUrl,
      title,
      overview,
      backDropPath,
      releaseDate,
      rating,
      posterPath,
    };
  }

  function fetchSimilarMovieData(moviesResult) {
    var moviesSimilarList = [];
    moviesResult.forEach((item) => {
      var posterPath = "http://image.tmdb.org/t/p/w400" + item["poster_path"];
      var id = item["id"];
      var title = item["original_title"];
      var overview = item["overview"];
      var backDropPath =
        "http://image.tmdb.org/t/p/w500" + item["backdrop_path"];
      var releaseDate = item["release_date"];
      var rating = item["vote_average"];

      var movieObj = {
        id,
        title,
        overview,
        backDropPath,
        releaseDate,
        rating,
        posterPath,
      };
      moviesSimilarList.push(movieObj);
    });
    setSimilarMovies(moviesSimilarList);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFunction = () => {
      const detailUrl = TMDB_BASE_URL + movieId + movieAPIS.MOVIE_DETAIL_API;
      const similarUrl = TMDB_BASE_URL + movieId + movieAPIS.SIMILAR_MOVIES_API;
      const urlArray = [detailUrl, similarUrl];

      try {
        urlArray.forEach(async (url) => {
          var res = await fetch(url);
          var jsonResponse = await res.json();
          if (url === detailUrl) {
            console.log("detail url --------------------------");
            var movieDetailData = await fetchMovieFromResult(jsonResponse);
            setMovieDetail(movieDetailData);
          } else {
            fetchSimilarMovieData(jsonResponse["results"]);
          }
        });
        setLoading(false);
      } catch (error) {
        console.log("error while fetching movie details: ", error);
        setLoading(false);
      }
    };
    setLoading(true);
    fetchFunction();

    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  console.log("similar movies : ", similarMovies);

  const YoutubeFrame = () => (
    <div className="video-container">
      <iframe
        title="cool"
        // src="https://www.youtube-nocookie.com/embed/3od-kQMTZ9M?autoplay=0&showinfo=0&controls=0"
        src={movieDetail.youtubeUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
  const CompanyLogoComp = ({ logo, name }) => (
    <div className="flex flex-col items-center m-4">
      <div className="w-20 h-20 relative object-cover items-center rounded-full p-2 bg-white">
        <img
          className="m-auto block absolute top-0 bottom-0 right-0 left-0 p-2"
          src={logo}
          alt="company images"
        ></img>
      </div>
      <p className="text-white text-lg">{name}</p>
    </div>
  );
  //   console.log('main gernes global are: ',movieDetail.gernes)

  const LoadingComponent = () => (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="loader"></div>{" "}
    </div>
  );

  const GerneButton = ({ text }) => (
    <div className="text-center bg-red-500 rounded-sm text-white mb-1 mr-2 px-2 py-1">
      {text}
    </div>
  );
  // const RecommendationsButtons = ({ text }) => (
  //   <div className="text-center bg-red-500 rounded-sm hover:cursor-pointer text-white px-4 m-2 py-1 hover:bg-red-600">
  //     {text}
  //   </div>
  // );
  const MoreButton = ({ text }) => (
    <div onClick={()=>setMoveActive(!isMoreActive)} className="text-center  bg-gray-600 rounded-sm text-white px-8 py-2 hover:bg-gray-800 hover:cursor-pointer ">
      {text}
    </div>
  );

  const PosterGroup = () => (
    <div className=" flex lg:flex-row flex-col items-start ">
      <div className="w-full  h-auto object-contain p-1 xsm:w-2/3 sm:w-1/2 lg:w-1/2 ">
        <img 
          src={movieDetail.posterPath}
          className="w-full h-full object-contain"
          alt="movie"
        ></img>
      </div>
      <div className="flex flex-col justify-start mt-2 m-1 p-1 lg:pl-8 w-full">
        <h1 className="text-white text-6xl">{movieDetail.title}</h1>
        <div className="flex justify-start mt-4 flex-wrap ">
          {movieDetail.gernes.map((item) => {
            return <GerneButton key={item["id"]} text={item["name"]} />;
          })}
          {/* <GerneButton text="Fantasy" />
          <GerneButton text="Horror" />
          <GerneButton text="Action" /> */}
        </div>
        <div className="flex flex-row items-center mt-4">
          <p className="text-white font-light">{movieDetail.releaseDate}</p>
          <p className=" text-white font-bold ml-8">
            {[...Array(Math.floor(movieDetail.rating))].map((item) => "⭐")}
          </p>
          <p className="text-white text-lg ml-2">{movieDetail.rating}</p>
        </div>
        <p className="text-blue-300 text-lg font-bold mt-2 ">
          {" ❤ " + movieDetail.tagline}
        </p>
        <p className="text-gray-300 text-xl font-light mt-4">
          {movieDetail.overview}
        </p>
        <ProductionCompanies />

      </div>
    </div>
  );

  const ProductionCompanies = () => (
    <div className="mt-4 m-1  flex justify-start xsm:justify-center overflow-x-auto">
      {movieDetail.productionCompanies.map((company) => {
        console.log(
          "images : ",
          movieAPIS.IMAGE_BASE_PATH + company["logo_path"]
        );
        if (company["logo_path"] != null)
          return (
            <CompanyLogoComp
              logo={movieAPIS.IMAGE_BASE_PATH + company["logo_path"]}
              name={company["name"]}
            />
          );
        else return <div></div>;
      })}
    </div>
  );

  const Recommendations = () => {
    return (
      <div className="mt-8">
        <p className="text-white text-3xl "> Similar movies 🍎 </p>
        <div className="grid grid-flow-row justify-center lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 ">
          {isMoreActive
            ? similarMovies.map((movie) => (
                <MovieItem
                  key={movie.id}
                  posterImage={movie.posterPath}
                  date={movie.releaseDate}
                  id={movie.id}
                  rating={movie.rating}
                  title={movie.title}
                />
              ))
            : similarMovies.slice(0, 5).map((movie) => {
                return (
                  <MovieItem
                    key={movie.id}
                    posterImage={movie.posterPath}
                    date={movie.releaseDate}
                    id={movie.id}
                    rating={movie.rating}
                    title={movie.title}
                  />
                );
              })}
        </div>
        <div className="flex justify-center my-4 ">
          <MoreButton  text= {isMoreActive ? 'Less' : "More + "} />
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className=" pt-24 sm:pt-12">
          <YoutubeFrame />
          <div className="mx-2 md:mx-4 lg:mx-12">
            <PosterGroup />
            <Recommendations />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
