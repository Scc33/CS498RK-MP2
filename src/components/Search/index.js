import { Component } from 'react';
import PropTypes from "prop-types";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

class Search extends Component {
    state = { popularMovies: [] }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    static propTypes = {
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange: () => { }
    }

    handleChange(event) {
        const { onChange } = this.props;
        onChange(event);
    }

    handleTypeChange = key => (event, value) => {
        console.log(key);
        if (value == "movie") {
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularMovies = res.data.results;
                this.setState({ popularMovies });
            })
        } else {
            axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularMovies = res.data.results;
                this.setState({ popularMovies });
            })
        }
        this.setState({
            [key]: value
          });
      };

    componentDidMount() {
        //API: f052c50e624989f8ef4a5acc45dfc7f2
        //Popular movies
        return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularMovies = res.data.results;
                this.setState({ popularMovies });
            })
            //Popular tv shows
            return axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularMovies = res.data.results;
                this.setState({ popularMovies });
            })
    }

    render() {
        var namesList = this.state.popularMovies.map(function (movie) {
            return (
                <Card sx={{ minWidth: 275, maxWidth: 500 }}>
                    <CardContent>
                        {movie.original_title}
                        {movie.overview}
                        {movie.vote_average}
                        {movie.vote_count}
                        {movie.release_date}
                        <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.original_title} />
                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
            );
        });
        return (
            <Container>
                <Grid>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Grid>
                <FormControl>
                    <RadioGroup
                        aria-label="gender"
                        defaultValue="movie"
                        name="radio-buttons-group"
                        onChange={this.handleTypeChange("type")}
                    >
                        <FormControlLabel value="movie" control={<Radio />} label="Popular Movies" />
                        <FormControlLabel value="tv" control={<Radio />} label="Popular TV Shows" />
                    </RadioGroup>
                    <RadioGroup
                        aria-label="gender"
                        defaultValue="ascending"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                        <FormControlLabel value="decending" control={<Radio />} label="Descending" />
                    </RadioGroup>
                </FormControl>
                <Grid item>
                {namesList}
                </Grid>
            </Container>
        );
    }
}

export default Search;