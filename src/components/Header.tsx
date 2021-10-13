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
import { useLocation } from 'react-router';

function RenderNav() {
  const location = useLocation();
  const path = location.pathname;
  console.log(location, typeof location, location.pathname);
  return (
    <nav>
      <ul>
        <li>
          <Link className={path === '/' ? 'menu-link__active' : 'menu-link'} to="/">Home</Link>
        </li>
        <li>
          <Link className={path === '/about' ? 'menu-link__active' : 'menu-link'} to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header>
      <Router>
        <div>
          <nav>
            <ul>
              {/*<li style={location ? { color: 'red' } : { color: 'green' }}>*/}
              {/*<li>*/}
              {/*  <Link to="/">Home</Link>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <Link to="/about">About</Link>*/}
              {/*</li>*/}
              <RenderNav />
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
