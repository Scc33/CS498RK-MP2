import { Component } from 'react';
import PropTypes from "prop-types";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';

class Search extends Component {
    state = { popularMovies: [] }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
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

    componentDidMount() {
        //API: f052c50e624989f8ef4a5acc45dfc7f2
        return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularMovies = res.data.results;
                this.setState({ popularMovies });
            })
    }

    render() {
        var namesList = this.state.popularMovies.map(function (movie) {
            return (
                <li>{movie.original_title} 
                {movie.overview} 
                {movie.vote_average} 
                {movie.vote_count} 
                {movie.release_date} 
                <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.original_title}/></li>
            );
        });
        return (
            <Container>
                <Grid>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Grid>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={this.handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <RadioGroup
                        aria-label="gender"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <ul>{namesList}</ul>
            </Container>
        );
    }
}

export default Search;