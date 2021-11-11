import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import Routing from './components/routing/Routing';

const App = () => (
  <Provider store={store}>
    <div>
      <h1 className="heading">News search engine</h1>
      <Routing />
    </div>
  </Provider>
);

export default App;
