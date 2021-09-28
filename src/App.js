import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form/Form';
import Card from './Components/Cards/Card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, cardData) {
    this.setState({ cards: [...this.state.cards, cardData] });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit} />
        <div className="card-field">
          {this.state.cards.map((item) => <Card key={item.uniqueID} card={item} />)}
        </div>
      </div>
    );
  }
}

export default App;
