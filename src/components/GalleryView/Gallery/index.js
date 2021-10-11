import { Component } from 'react';
import Search from '../../Search';
import Results from '../Results';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Gallery extends Component {
  state = {
    filtered: [],
    popularMovies: [],
    genres: [],
    genreButtons: '',
    handleGenreChange(event) {
      console.log(this.state);
      console.log(event)
    }
  }

  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    const { value } = event.target;
    const filtered = this.state.popularMovies.filter(movie => (
      movie.title.toLowerCase().includes(value.toLowerCase())
    ));
    this.setState({ filtered });
  }

  componentDidMount() {
    //API: f052c50e624989f8ef4a5acc45dfc7f2
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US')
      .then(res => {
        console.log(res.data.genres);
        const genres = res.data.genres;
        this.setState({ genres: genres })
      })

    return axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const filtered = res.data.results;
        this.setState({ filtered });
        const popularMovies = res.data.results;
        this.setState({ popularMovies });
      })
  }

  render() {
    return (
      <div className="App">
        <Search onChange={this.handleSearchChange} />
        <Button variant="constrained" id="2" onClick={this.handleGenreChange}>asdf</Button>
        <Results content={this.state.filtered} />
      </div>
    );
  }
}

export default Gallery;
