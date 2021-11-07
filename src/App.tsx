import React from 'react';
import './App.css';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './app/store';

const App = () => (
  <Provider store={store}>
    <div>
      <h1 className="heading">News search engine</h1>
      <Header />
    </div>
  </Provider>
);

export default App;
