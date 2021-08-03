import React from "react";
// import imdb from "../../../images/imdb.png";
import "../../../index.css";
import styles from "../../../styles/poster.module.css";
import playButtonSrc from "../../../images/playButton.png";
import { useHistory } from "react-router-dom";

function MainPoster({ moviePoster }) {
  const backdropPath = moviePoster && moviePoster.backDropPath;
  // const id = moviePoster && moviePoster.id;
  const posterPath = moviePoster && moviePoster.posterPath;
  const rating = moviePoster && moviePoster.rating;
  const title = moviePoster && moviePoster.title;
  const date = moviePoster && moviePoster.releaseDate;

  const history = useHistory();
  const handleOnClick = (linkUrl) => {
    history.push(linkUrl);
  };

  return (
    <div className="relative mb-8">
      <div className="bg-black opacity-50 w-full h-full absolute z-20"></div>
      <div className="bg-gradient-to-t from-black via-black to-transparent w-full h-20 absolute z-20 bottom-0"></div>

      <div className="flex flex-col absolute bottom-0 m-4 z-30 right-0 left-0">
        <div className="flex flex-row justify-between  absolute  bottom-6 left-0 right-0 my-4 z-30 items-end">
          <p className={styles.movietitle}>{title}</p>
          <div
            onClick={() => handleOnClick("/movie/" + moviePoster.id)}
            className={` ${styles.smallPoster} hoverScale flex justify-center items-center cursor-pointer`}
          >
            <img src={posterPath} alt="main poster" />
            <img
              src={playButtonSrc}
              alt="play_button"
              className="h-12 w-12 absolute"
            />
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <p className=" font-bold text-white mx-2">{" 👌 " + rating}</p>
          <p className=" font-bold text-white mx-2">{" 📅 " + date}</p>
        </div>
      </div>
      <img className={styles.poster} src={backdropPath} alt="main poster"></img>
    </div>
  );
}

export default MainPoster;
