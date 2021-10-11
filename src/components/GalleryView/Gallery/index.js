import { Component } from 'react';
import './styles.scss';
import Results from '../Results';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Gallery extends Component {
  state = {
    shows: [],
    genres: [],
  }

  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  handleSearchChange(event) {
    const { value } = event.target;
    const filtered = this.state.popularMovies.filter(movie => (
      movie.title.toLowerCase().includes(value.toLowerCase())
    ));
    this.setState({ filtered });
  }

  handleGenreChange() {

  }

  componentDidMount() {
    //API: f052c50e624989f8ef4a5acc45dfc7f2
    axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US')
      .then(res => {
        const genres = res.data.genres;
        this.setState({ genres })
      })

    return axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const shows = res.data.results;
        this.setState({ shows });
      })
  }

  render() {
    var genres = [];
    for (var i = 0; i < this.state.genres.length; i++) {
      genres.push(
        <Button
          variant="constrained"
          key={this.state.genres[i].id}
          onClick={this.handleGenreChange}
          className="genre-buttons"
        >
          {this.state.genres[i].name}
        </Button>
      )
    }
    return (
      <div className="App">
        <div className="genres">
          {genres}
        </div>
        <Results content={this.state.shows} />
      </div>
    );
  }
}

export default Gallery;
