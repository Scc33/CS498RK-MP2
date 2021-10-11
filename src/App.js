import * as React from 'react';
import {
  Link,
  HashRouter
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import './App.css';
import ListView from './components/ListView';
import Gallery from './components/GalleryView/Gallery';
import Home from './components/Home';
import { Component } from 'react';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


class App extends Component {
  state = {
    popularMovies: [],
    popularTVs: [],
    type: "movie"
  }

  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  //API: f052c50e624989f8ef4a5acc45dfc7f2
  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const popularMovies = res.data.results;
        this.setState({ popularMovies });
      })
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const popularTVs = res.data.results;
        this.setState({ popularTVs });
      })
  }

  handleTypeChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    console.log("home", this.state)
    return (
      <div className="section">
        <div className="menu">
          <h1 className="header">Movies</h1>
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
        <HashRouter basename="/calendar"/>
          <Link to="ListView" component>
            <ListView
              popularMovies={this.state.popularMovies}
              popularTVs={this.state.popularTVs}
              type={this.state.type}
            />
          </Link>
          <Link to="Gallery" component={Gallery} />
          <Link to="/">
            <Home />
            <RadioGroup
              aria-label="gender"
              defaultValue="movie"
              name="radio-buttons-group"
              onChange={this.handleTypeChange("type")}
            >
              <div className="item">
                <FormControlLabel value="movie" control={<Radio />} label="Popular Movies" />
                <FormControlLabel value="tv" control={<Radio />} label="Popular TV Shows" />
              </div>
            </RadioGroup>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;