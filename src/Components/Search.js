import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="search-bar">
        <form className="search-bar__form" action="/" method="get">
          <label className="search-bar__label" htmlFor="search-bar">Search bar: </label>
          <input className="search-bar__input" id="search-bar" type="text" placeholder="Search for..."/>
          <button className="search-bar__submit" type="submit"><i className="fas fa-search"></i></button>
        </form>
      </div>
    );
  }
}

export default Search;
