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
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event, cardData) {
    this.setState({ cards: [...this.state.cards, cardData] });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Form formSubmit={this.formSubmit} />
        <div className="card-field">
          {this.state.cards.map((item, index) => <Card key={index} card={item} />)}
        </div>
      </div>
    );
  }
}

export default App;
