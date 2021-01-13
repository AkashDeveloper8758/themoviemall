import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import { movieAPIS } from "../../../defaultConstants";
import "../../../index.css";
import DialogMovieDetail from "./dialogMovieDetail";
import BackIcon from "../../../images/previous.svg";
import LoadingComponent from "./loadingComponent";

function DialogPopup({
  openPopup,
  setOnPopup,
  searchQuery,
  inputClearFunction,
}) {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetail, setMovieDetal] = useState({});

  useEffect(() => {
    const myFetch = async () => {
      var myUrl = movieAPIS.OMDB_API + "s=" + searchQuery;
      // console.log("my url : ", myUrl);
      try {
        var mySearchMovieResult = [];
        var res = await fetch(myUrl);
        var resData = await res.json();
        // console.log("final data: ", resData);
        setIsLoading(false);
        var searchData = resData["Search"];
        if (searchData !== undefined) {
          searchData.forEach((movieItem) => {
            if (movieItem["Poster"] !== "N/A") {
              var searchObj = {
                id: movieItem["imdbID"],
                posterImage: movieItem["Poster"],
                title: movieItem["Title"],
                date: movieItem["Year"],
              };
              mySearchMovieResult.push(searchObj);
            }
          });
          setMovieList(mySearchMovieResult);
          //   setMovieDetal(mySearchMovieResult[0].id);
        }
      } catch (error) {
        console.log("error while OMDB FETCH: ", error);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    myFetch();
  }, [searchQuery]);



  const MoviePosterComponent = ({ posterImage, title, date, imdbId }) => {
    return (
      <div
        className="wrapper__child__dialog"
        onClick={() => {
          clickHandler(imdbId);
        }}
      >
        <img
          className=" object-cover w-full h-full  rounded-lg "
          src={posterImage}
          alt="main poster"
        ></img>
        <div className="row justify-between">
          <p className="text-lg ">{title}</p>
          <p className="text-lg">{date}</p>
        </div>
      </div>
    );
  };

  const MovieComponent = () => (
    //   <div className="m-4 p-4 flex space-x-4 flex-nowrap">
    <div className="wrapper__dialog">
      {movieList.map((movieItem) => {
        if (movieItem["Poster"] !== "N/A") {
          return (
            <MoviePosterComponent
              key={movieItem.id}
              posterImage={movieItem.posterImage}
              title={movieItem.title}
              date={movieItem.date}
              imdbId={movieItem.id}
            />
          );
        } else return <div></div>;
      })}
    </div>
  );
  const clickHandler = (imdbID) => {
    console.log("imdb id : ", imdbID);
    setMovieDetal({ imdbId: imdbID });
  };

  const DialogTitleContent = () => (
    <div className="flex ">
      {movieDetail.imdbId !== undefined ? (
        <div className="flex ">
          <img
            className="w-8 h-8 mx-2 hover:cursor-pointer"
            onClick={() => setMovieDetal({})}
            src={BackIcon}
            alt="back arrow"
          ></img>
          <p>Back</p>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <div className=' flex flex-col xsm:flex-row justify-start xsm:fitems-center'>
          <p>Search for : </p>
          <p className="text-xl text-blue-600 font-bold">{searchQuery}</p>
          </div>
          <Button variant='text' onClick={()=>{
            setOnPopup(false);
            inputClearFunction();
          }} > X </Button>
        </div>
      )}
    </div>
  );

  return (
    <Dialog
      open={openPopup}
      maxWidth={movieDetail.imdbId !== undefined ? "md" : "lg"}
      onClose={() => {
        setOnPopup(false);
        inputClearFunction();
      }}
      fullWidth={true}
    >
      <DialogTitle>
        <DialogTitleContent />
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LoadingComponent />
        ) : movieDetail.imdbId !== undefined ? (
          <DialogMovieDetail id={movieDetail["imdbId"]} />
        ) : (
          <MovieComponent />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DialogPopup;
