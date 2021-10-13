import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import News from './News';
import About from './About';
import Page404 from './Page404';

function Header() {
  return (
    <header>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* switch part */}
        <Switch>
          <Route exact path="/">
            <News />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </header>
  );
}

export default Header;
