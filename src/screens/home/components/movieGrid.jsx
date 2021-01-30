import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "./movieItem";

const MovieGrid = ({ movies, route, isExpanded }) => {
  // console.log('grid movies : ',movies)

  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-2 ">
      {movies &&
        movies.map((element, i) => {
          var visibility = i === 4 && !isExpanded ? "visible" : "invisible";
          return (
            <div className="relative">
              <Link to={route}>
                <div
                  className={` flex absolute top-0 right-0 bg-black  bg-opacity-60 hover:cursor-pointer hover:bg-opacity-80 w-1/2 h-full z-10 center ${visibility} `}
                >
                  <div className=" flex items-center justify-center font-bold text-2xl text-white h-full w-full content-center">
                    <p>{" more + "}</p>
                  </div>
                </div>
              </Link>
              <MovieItem
                key={element.id}
                backDropPath={element.backDropPath}
                id={element.id}
                posterImage={element.posterPath}
                date={element.releaseDate}
                rating={element.rating}
                title={element.title}
              />
            </div>
          );
        })}
    </div>
  );
};

export default MovieGrid;
