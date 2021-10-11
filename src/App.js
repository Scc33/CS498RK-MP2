import * as React from 'react';
import { Component } from 'react';
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
import axios from 'axios'
import DetailView from './components/DetailView';

class App extends Component {
  state = {
    popularTVs: []
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const popularTVs = res.data.results;
        console.log(popularTVs)
        this.setState({ popularTVs });
      })
  }

  render() {
    return (
      <div className="section">
        <div className="menu">
          <h1 className="header">Movies</h1>
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
              <Route path="/Gallery">
                <Gallery />
              </Route>
              {this.state.popularTVs.map((content) => (
                <Route path={"/Content/" + content.id}>
                  <DetailView />
                </Route>
              ))}
              <Route path="/ListView">
                <ListView />
              </Route>
              <Route path="/">
                <ListView />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default App;
