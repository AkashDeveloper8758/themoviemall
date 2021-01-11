import {actionType } from "./defaultConstants";

const Reducers = (state, action) => {
  switch (action.type) {

    case actionType.SET_MOVIES:
        console.log('set movies called with : ',action.payload.movieType)
        const movieType = action.payload.movieType;
        state[movieType] = action.payload.movies;
        // console.log('and movies are AFTER ',state[movieType])
      return state;

    default:
      return state;
  }
};

export default Reducers;
