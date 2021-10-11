import { Component } from 'react';
import './styles.scss';
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

class ListView extends Component {
    state = {
        filter: [],
        popularMovies: [],
        popularTVs: [],
        type: "movie",
        order: "ascending",
        rating: "0",
        titleSearch: ""
    }

    constructor(props) {
        super(props);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    clear = () => {
        const titleSearch = ""
        this.setState({ titleSearch });
    }

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ titleSearch: value });
        var filter;
        if (this.state.type === "movie") {
            console.log(this.state.rating);
            filter = this.state.popularMovies.filter(content => (
                content.title.toLowerCase().includes(value.toLowerCase()) &&
                content.vote_average >= parseFloat(this.state.rating)
            ));
            if (this.state.order === "descending") {
                filter.reverse();
            }
        } else {
            filter = this.state.popularTVs.filter(content => (
                content.name.toLowerCase().includes(value.toLowerCase()) &&
                content.vote_average >= parseFloat(this.state.rating)
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

    handleRatingChange(event){
        const { value } = event.target;
        this.setState({ rating: value });
        var filter;
        if (this.state.type === "movie") {
            console.log(this.state.rating);
            filter = this.state.popularMovies.filter(content => (
                content.vote_average >= parseFloat(value)
            ));
            if (this.state.order === "descending") {
                filter.reverse();
            }
        } else {
            filter = this.state.popularTVs.filter(content => (
                content.vote_average >= parseFloat(value)
            ));
            if (this.state.order === "descending") {
                filter.reverse();
            }
        }
        this.setState({ filter });
    }

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
            <div className="search">
                <Card className="bar-container">
                    <CardContent>
                        <div className="search-bar">
                            <TextField
                                value={this.state.titleSearch}
                                id="outlined-basic"
                                label="Title Search"
                                variant="outlined"
                                onChange={this.handleSearchChange}
                                className="search-size"
                            />
                        </div>
                        <FormControl>
                            <div className="item">
                                <RadioGroup
                                    aria-label="gender"
                                    defaultValue="movie"
                                    name="radio-buttons-group"
                                    onChange={this.handleTypeChange("type")}
                                >
                                    <div className="item">
                                        <FormControlLabel value="movie" control={<Radio />} label="Popular Movies" />
                                        <FormControlLabel value="tv" control={<Radio />} label="Popular TV Shows" />
                                    </div>
                                </RadioGroup>
                                <RadioGroup
                                    aria-label="gender"
                                    defaultValue="ascending"
                                    name="radio-buttons-group"
                                    onChange={this.handleOrderChange("order")}
                                >
                                    <div className="item">
                                        <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                                        <FormControlLabel value="descending" control={<Radio />} label="Descending" />
                                    </div>
                                </RadioGroup>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        label="rating"
                                        defaultValue="0"
                                        onChange={this.handleRatingChange}
                                    >
                                        <MenuItem value="0">All Movies</MenuItem>
                                        <MenuItem value="9">Greater than 9</MenuItem>
                                        <MenuItem value="8">Greater than 8</MenuItem>
                                        <MenuItem value="7">Greater than 7</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </FormControl>
                    </CardContent>
                </Card>
                <div className="results">
                    {this.state.filter.map((content) => (
                        <div className="card" key={content.id}>
                            <Card>
                                <CardContent className="card-content">
                                    <div className="card-supp-details">
                                        {content.overview}
                                        <div>
                                            Average Score: {content.vote_average} <FontAwesomeIcon icon={faStar} />
                                        </div>
                                        <div>
                                            Number of Votes: {content.vote_count}
                                        </div>
                                        <div>
                                            Release Date: {content.release_date}
                                        </div>
                                    </div>
                                    <img className="img" src={"https://image.tmdb.org/t/p/w500" + content.poster_path} />
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ListView;