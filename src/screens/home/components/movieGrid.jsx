import React from "react";
import MovieItem from "./movieItem";

const MovieGrid = ({movies}) => {
  // console.log('grid movies : ',movies)

  return (
    <div className="grid grid-flow-row lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 ">
      { movies &&  movies.map((element, i) => {
        return (
          <MovieItem
            key={element.id}
            backDropPath={element.backDropPath}
            id={element.id}
            posterImage={element.posterPath}  
            date={element.releaseDate}
            rating={element.rating}
            title={element.title}
          />
        );
      }) }
    </div>
  );
};

export default MovieGrid;
