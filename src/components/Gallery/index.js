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
      movie.original_title.toLowerCase().includes(value.toLowerCase())
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
        /*var genres = res.data.genres;
        var i;
        var loopData = ''
        for (i = 0; i < genres.length; i++) {
          loopData += `<Button variant="constrained" id=${genres[i].id} onClick=this.handleGenreChange>${genres[i].name}</Button>`
        }
        this.setState({ genreButtons: loopData })*/
      })

    return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
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
        <Header />
        <GallerySearch onChange={this.handleSearchChange} />
        <Button variant="constrained" id="2" onClick={this.handleGenreChange}>asdf</Button>
        <div dangerouslySetInnerHTML={{__html: this.state.genreButtons}} />
        <Results movies={this.state.filtered} />
      </div>
    );
  }
}

export default Gallery;
