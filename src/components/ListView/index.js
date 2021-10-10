import { Component } from 'react';
import PropTypes from "prop-types";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Search from '../Search';
import TextField from '@material-ui/core/TextField';
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
        popularMovies: [],
        popularTVs: [],
        type: "movie",
        order: "ascending"
    }

    constructor(props) {
        super(props);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
    }

    clear = () => {
        const titleSearch = ""
        this.setState( {titleSearch} );
      }

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ titleSearch: value });
        var filter;
        if (this.state.type === "movie") {
            filter = this.state.popularMovies.filter(content => (
                content.title.toLowerCase().includes(value.toLowerCase())
            ));
            if (this.state.order === "descending") {
                filter.reverse();
            }
        } else {
            filter = this.state.popularTVs.filter(content => (
                content.name.toLowerCase().includes(value.toLowerCase())
            ));
            if (this.state.order === "descending") {
                filter.reverse();
            }
        }
        this.setState({ filter });
    }

    handleTypeChange = key => (event, value) => {
        this.setState({
            [key]: value
        });
        this.clear();
        if (value === "movie") {
            if (this.state.order === "descending") {
                console.log("reversing");
                const filter = this.state.popularMovies.slice().reverse();
                this.setState({ filter });
            } else {
                const filter = this.state.popularMovies;
                this.setState({ filter });
            }
        } else {
            if (this.state.order === "descending") {
                const filter = this.state.popularTVs.slice().reverse();
                this.setState({ filter });
            } else {
                const filter = this.state.popularTVs;
                this.setState({ filter });
            }
        }
    };

    handleOrderChange = key => (event, value) => {
        const filter = this.state.filter.slice().reverse();
        this.setState({ filter });
        this.setState({
            [key]: value
        });
    };

    //API: f052c50e624989f8ef4a5acc45dfc7f2
    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularMovies = res.data.results;
                this.setState({ popularMovies });
                const filter = res.data.results;
                this.setState({ filter });
            })
        axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularTVs = res.data.results;
                this.setState({ popularTVs });
            })
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <TextField
                        value={this.state.titleSearch}
                        id="outlined-basic"
                        label="Title Search"
                        variant="outlined"
                        onChange={this.handleSearchChange}
                    />
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
                            <FormControlLabel value="descending" control={<Radio />} label="Descending" />
                        </RadioGroup>
                    </FormControl>
                    <Grid item>
                        {this.state.filter.map((content) => (
                            <div className="Results-item" key={content.id}>
                                <Card sx={{ minWidth: 275, maxWidth: 500 }}>
                                    <CardContent>
                                        {content.overview}
                                        {content.vote_average}
                                        {content.vote_count}
                                        {content.release_date}
                                        <img src={"https://image.tmdb.org/t/p/w500" + content.poster_path} />
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>
                            </div>
                        ))}
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ListView;