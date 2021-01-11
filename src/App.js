import NavBar from './screens/home/components/navBar';
import HomeScreen from './screens/home/home';
import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieTypeScreen from './screens/typeScreen/moviesTypeScreen';
// import MovieScreen from './screens/typeScreen/MovieScreen';
import { GlobalProvider } from './GlobalStates';
// import "./index.css";
import { movieType,routeConstants } from "./defaultConstants";
import MovieDetail from './screens/typeScreen/MovieDetailScreen';
// import MovieDetail from './screens/typeScreen/MovieDetailScreen';


function App() {
  return (
    <div className="container">
      <GlobalProvider>
        <Router>
          <NavBar/>
          <Switch>
            <Route path='/' exact component={HomeScreen} />
            <Route path='/home' component={HomeScreen} />
            <Route exact path='/movie/:id' render ={(props) => <MovieDetail movieId={props.match.params.id} /> } />
            <Route path= {routeConstants.POPULAR_ROUTE} render={() => <MovieTypeScreen localMovieType={movieType.POPULAR_NOW} />} />
            <Route path={routeConstants.TOP_RATED_ROUTE} render={() => <MovieTypeScreen localMovieType={movieType.TOP_RATED} />} />
            <Route path={routeConstants.PLAYING_NOW_ROUTE} render={() => <MovieTypeScreen localMovieType={movieType.PLAYING_NOW} />} />
            <Route path={routeConstants.UPCOMMING_ROUTE} render={() => <MovieTypeScreen localMovieType={movieType.UPCOMMING_MOVIES} />} />
            {/* <Route path='/movie/:id' component={MovieScreen} /> */}
          </Switch>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
