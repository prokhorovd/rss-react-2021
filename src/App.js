import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search';
import MovieCard from './Components/MovieCard';
import moviesData from './assets/movies-list';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: moviesData,
    };
  }
  render() {
    const moviesList = this.state.movies.map((item) => <MovieCard key={item.id} item={item} />);
    return (
      <div className="App">
        <Search />
        <div className="movie-cards">
          {moviesList}
        </div>
      </div>
    );
  }
}

export default App;
