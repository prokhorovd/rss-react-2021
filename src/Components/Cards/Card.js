import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      receiveNews
    } = this.props.card;
    return (
      <div className="person-card">
        <p>
          FirstName:
          <span className="person-card__data">{firstName}</span>
        </p>
        <p>
          LastName:
          <span className="person-card__data">{lastName}</span>
        </p>
        <p>
          Date of Birth:
          <span className="person-card__data">{dateOfBirth}</span>
        </p>
        <p>
          Gender:
          <span className="person-card__data">{gender}</span>
        </p>
        <p>
          Wanted to receive news:
          <span className="person-card__data">{receiveNews === true ? 'yes' : 'no'}</span>
        </p>
      </div>
    );
  }
}

export default Card;
