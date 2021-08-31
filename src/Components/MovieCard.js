import React, { Component } from 'react';

class MovieCard extends Component {
  render() {
    const genresList = this.props.item.genres.join(', ');
    return (
      <div className="movie-card">
        <div className="movie-card__name">
          <img className="movie-card__img" src={`../assets/movie-covers/${this.props.item.img}.jpg`} alt="shawshank redemption poster"/>
          <h3 className="movie-card__header">
            <span>{this.props.item.id}. </span>
            {this.props.item.name}
            <span> ({this.props.item.year})</span>
          </h3>
        </div>
        <div className="movie-card__meta">
          <p className="movie-card__rating"><i className="fas fa-star"></i> {this.props.item.rating}</p>
          <p className="movie-card__data">{this.props.item.length} min | {genresList}</p>
        </div>
        <p className="movie-card__description">{this.props.item.description}</p>
      </div>
    );
  }
};

export default MovieCard;
