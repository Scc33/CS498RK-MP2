import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import './App.css';
import ListView from './components/ListView';
import Gallery from './components/GalleryView/Gallery';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <div className="section">
        <h1 className="header">Movies</h1>
      </div>
      <div className="section">
        <div className="menu">
          <div className="menu-link">
            <Button variant="contained" href="/">Home</Button>
          </div>
          <div className="menu-link">
            <Button variant="contained" href="/ListView">Search</Button>
          </div>
          <div className="menu-link">
            <Button variant="contained" href="/Gallery">Gallery</Button>
          </div>
        </div>
        <div className="item">
          <Router>
            <Switch>
              <Route path="/ListView">
                <ListView />
              </Route>
              <Route path="/Gallery">
                <Gallery />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;