import { Component } from 'react';
import PropTypes from "prop-types";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Search from '../Search';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

class ListView extends Component {
    state = {
        filter: [],
        popular: [],
        type: "movie",
        order: "ascending"
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }

    static propTypes = {
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange: () => { }
    }

    handleSearchChange(event) {
        const { value } = event.target;
        if (this.state.type == "movie") {
            const filter = this.state.popular.filter(content => (
                content.title.toLowerCase().includes(value.toLowerCase())
            ));
            this.setState({ filter });
        } else {
            const filter = this.state.popular.filter(content => (
                content.name.toLowerCase().includes(value.toLowerCase())
            ));
            this.setState({ filter });
        }
    }

    handleChange(event) {
        const { onChange } = this.props;
        onChange(event);
    }

    handleTypeChange = key => (event, value) => {
        if (this.state.type === "movie") {
            this.setState({ });
        } else {
            axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
                .then(res => {
                    const popular = res.data.results;
                    this.setState({ popular });
                    const filter = res.data.results;
                    this.setState({ filter });
                })
        }
        this.setState({
            [key]: value
        });
        console.log([key], value, this.state)
    };

    handleOrderChange = key => (event, value) => {
        const filter = this.state.filter.reverse();
        this.setState({ filter });
        this.setState({
            [key]: value
        });
        console.log([key], value, this.state)
    };

    componentDidMount() {
        //API: f052c50e624989f8ef4a5acc45dfc7f2
        //Popular movies
        return axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popular = res.data.results;
                this.setState({ popular });
                const filter = res.data.results;
                this.setState({ filter });
            })
    }

    render() {
        var namesList = this.state.popular.map(function (movie) {
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
            <div className="App">
                <Container>
                    <Grid>
                        <Search onChange={this.handleSearchChange} />
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
                            onChange={this.handleOrderChange("order")}
                        >
                            <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                            <FormControlLabel value="decending" control={<Radio />} label="Descending" />
                        </RadioGroup>
                    </FormControl>
                    <Grid item>
                        {this.state.filter.map((movie) => (
                            <div className="Results-item" key={movie.original_title}>
                                <div>
                                    <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                                </div>
                                <div>
                                    {movie.original_title}
                                </div>
                            </div>
                        ))}
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ListView;