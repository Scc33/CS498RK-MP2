import { Component } from 'react';
import './styles.scss';
import Results from '../Results';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Gallery extends Component {
  state = {
    shows: [],
    genres: [],
    filtered: []
  }

  constructor(props) {
    super(props);
    this.handleGenreChange = this.handleGenreChange.bind(this);
  }

  handleGenreChange = key => (event, value) => {
    if (key == -1) {
      this.setState({ filtered: this.state.shows })
    } else {
      const filtered = this.state.shows.filter(show => (
        show.genre_ids.includes(key)
      ));
      this.setState({ filtered });
    }
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
        this.setState({ filtered: shows });
      })
  }

  render() {
    var genres = [];
    for (var i = 0; i < this.state.genres.length; i++) {
      genres.push(
        <div className="genre-button" key={this.state.genres[i].id}>
          <Button
            variant="contained"
            id={this.state.genres[i].id}
            onClick={this.handleGenreChange(this.state.genres[i].id)}
          >
            {this.state.genres[i].name}
          </Button>
        </div>
      )
    }
    return (
      <div className="App">
        <h2 className="title">Genres</h2>
        <div className="genres">
        <Button
            variant="contained"
            id={-1}
            onClick={this.handleGenreChange(-1)}
          >All Genres</Button>
          {genres}
        </div>
        <Results content={this.state.filtered} />
      </div>
    );
  }
}

export default Gallery;
