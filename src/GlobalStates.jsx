import React, { createContext, useReducer } from "react";
import { actionType } from "./defaultConstants";
import  Reducers  from "./AppReducers";



const initialState = {
  movies : [
    {
      id: 464052,
      original_language: "en",
      original_title: "Wonder Woman 1984",
      overview:
        "Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.",
      popularity: 6017.605,
      poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
      release_date: "2020-12-16",
      title: "Wonder Woman 1984",
      video: false,
      vote_average: 7.3,
      vote_count: 2153,
    },
  ],
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducers, initialState);

  function setMoviesAction(type, movies) {
    dispatch({
      type: actionType.SET_MOVIES,
      payload: {
        movieType: type,
        movies,
      },
    });
  }

  return (
    <GlobalContext.Provider
      value={{ moviesGlobal: state, setMoviesAction }}>
      {children}
    </GlobalContext.Provider>
  );
};
