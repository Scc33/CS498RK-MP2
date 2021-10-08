import { Component } from 'react';
import Header from '../Header';
import GallerySearch from '../GallerySearch';
import Results from '../Results';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Gallery extends Component {
  state = {
    filtered: [],
    popularMovies: [],
    genres: []
  }

  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    //API: f052c50e624989f8ef4a5acc45dfc7f2
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US')
      .then(res => {
        console.log(res.data.genres);
        const genres = res.data.genres;
        this.setState({ genres });
      })

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
    ));

    this.setState({ filtered });
  }

  handleGenreChange(event) {
    const { value } = event.target;
    console.log(this.state);
    const filtered = this.state.popularMovies.filter(movie => (
      movie.original_title.toLowerCase().includes(value.toLowerCase())
    ));

    this.setState({ filtered });
  }

  render() {
    console.log(this.state.genres)
    var genreList = this.state.genres.map(function (genre) {
      return (
        <Button variant="contained" id={genre.id}>{genre.name}</Button>
      );
    });
    return (
      <div className="App">
        <Header />
        <GallerySearch onChange={this.handleSearchChange} />
        { genreList }
        <Results movies={this.state.filtered} />
      </div>
    );
  }
}

export default Gallery;
