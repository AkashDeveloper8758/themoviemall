import React, { useContext } from "react";
import MovieGrid from "../home/components/movieGrid";
import { GlobalContext } from "../../GlobalStates";
import { movieType } from "../../defaultConstants";

function MovieTypeScreen({ localMovieType }) {
  const { moviesGlobal } = useContext(GlobalContext);
  var moviesSpecific = moviesGlobal[localMovieType];
  console.log("[type] movies specific are  : ", moviesSpecific);
  console.log("[type] movies are  : ", localMovieType);

  window.scrollTo(0, 0);

  return (
    <div className="pt-12">
      <MovieGrid movies= {localMovieType === movieType.TOP_RATED ? moviesSpecific.slice(3) :  moviesSpecific} />
    </div>
  );
}

export default MovieTypeScreen;
