import React, { useState, useEffect } from "react";
import { movieAPIS } from "../../../defaultConstants";
import "../../../index.css";
import ImdbLogo from "../../../images/imdb.png";
import LoadingComponent from "./loadingComponent";

function DialogMovieDetail({ id }) {
  const [movieDetail, setMovieDetail] = useState({
    // Genre: "Action, Adventure, Fantasy",
    Genre: [],
    Actors: [],
    Ratings: [],
  });
  const [isLoading, setLoading] = useState(true);

  function movieDataParser(data) {
    data.Genre = data.Genre.split(",");
    data.Actors = data.Actors.split(",");
    setMovieDetail(data);
  }


  useEffect(() => {
    setLoading(true);
    const myUrl = movieAPIS.OMDB_API + "i=" + id;
    // console.log("detail api url: ", myUrl);
    const fetchMovieDetail = async () => {
      const res = await fetch(myUrl);
      const resData = await res.json();
      // console.log("value is: ", resData);
      movieDataParser(resData);
      setLoading(false);
    };
    fetchMovieDetail();
  }, [id]);

  const GerneButton = ({ text, color }) => (
    <div
      className="text-center rounded-sm text-white my-1 mr-1 px-2 py-1"
      style={{ backgroundColor: color }}
    >
      {text}
    </div>
  );

  const MoviePosterComponent = ({ posterImage }) => {
    return (
      <div className="wrapper__child__dialog__detail">
        <img
          className=" object-contain w-full h-full rounded-lg "
          src={posterImage}
          alt="main poster"
        ></img>
      </div>
    );
  };

  const ActorsComponent = ({ actors }) => (
    <div className="flex flex-wrap justify-start ">
      {actors.map((actor) => (
        <GerneButton color={"#3385ff"} text={actor} />
      ))}
    </div>
  );
  const MetadataComp = ({ production, boxOffice }) => (
    <div className="flex  flex-col sm:flex-row">
      <div className="flex bg-blue-300 m-1 p-2 rounded-sm">
        <p className="text-lg mr-1 ">🏦</p>
        <p className="text-lg  font-bold">{production}</p>
      </div>
      <div className="flex bg-green-200 m-1 p-2 rounded-sm">
        <p className="text-lg mr-1 ">💲</p>
        <p className="text-lg font-bold">{boxOffice}</p>
      </div>
    </div>
  );

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col sm:flex-row justify-start items-center sm:items-start">
          <MoviePosterComponent posterImage={movieDetail.Poster} />
          <div className="flex flex-col m-1 items-start  py-4 overflow-x-hidden overflow-y-auto">
            <div className="text-4xl font-bold ">{movieDetail.Title}</div>
            <div className="flex my-2 space-x-2 font-bold">
              <p>{movieDetail.Runtime + " / "}</p>
              <p>{movieDetail.Released + " / "}</p>
              <p>{movieDetail.Rated}</p>
            </div>
            <div className="flex flex-row my-2 items-center">
              <div className="flex flex-row bg-yellow-200 items-center mr-1">
                <img
                  className="h-8 w-auto"
                  src={ImdbLogo}
                  alt="imdb logo"
                ></img>
                <p className="text-lg font-bold mx-4 ">
                  {movieDetail.imdbRating}
                </p>
              </div>
              <div className="flex flex-row items-center bg-red-200">
                <p className="text-2xl">🍅</p>
                <p className="text-lg font-bold mx-4">43%</p>
              </div>
            </div>
            <MetadataComp
              boxOffice={movieDetail.BoxOffice}
              production={movieDetail.Production}
            />
            <div className="flex flex-wrap m-1">
              {movieDetail.Genre.map((genreText) => {
                return <GerneButton text={genreText} color={"#CC0033"} />;
              })}
            </div>
            <p className="text-xl">{movieDetail.Plot}</p>
            <ActorsComponent actors={movieDetail.Actors} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DialogMovieDetail;
