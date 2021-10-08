import { Component } from 'react';

import Header from '../Header';
import GallerySearch from '../GallerySearch';
import Results from '../Results';

import axios from 'axios';


//import emojis from "../../emojis.json";

class Gallery extends Component {
  state = {
    filtered: [],
    popularMovies: []
  }

  constructor(props) {
    super(props);
    //this.state = { emojis }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    //API: f052c50e624989f8ef4a5acc45dfc7f2
    return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const filtered = res.data.results;
        this.setState({ filtered });
        const popularMovies = res.data.results;
        this.setState({ popularMovies });
      })
  }

  handleSearchChange(event) {
    const { value } = event.target;
    console.log(this.state);
    const filtered = this.state.popularMovies.filter(movie => (
      movie.original_title.toLowerCase().includes(value.toLowerCase())
      //emoji.keywords.includes(value)
    ));

    this.setState({ filtered });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <GallerySearch onChange={this.handleSearchChange} />
        <Results movies={this.state.filtered} />
      </div>
    );
  }
}

export default Gallery;
