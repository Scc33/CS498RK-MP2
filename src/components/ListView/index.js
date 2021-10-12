import { Component } from 'react';
import './styles.scss';
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'
import axios from 'axios'

class ListView extends Component {
    state = {
        filter: [],
        popularTVs: [],
        order: "ascending",
        sorted: "pop",
        rating: "0",
        titleSearch: ""
    }

    constructor(props) {
        super(props);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleOrderChange = this.handleOrderChange.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
    }

    //API: f052c50e624989f8ef4a5acc45dfc7f2
    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
            .then(res => {
                const popularTVs = res.data.results;
                for (var i = 0; i < popularTVs.length; i++) {
                    popularTVs[i]["rank"] = i;
                }
                console.log(popularTVs);
                this.setState({ popularTVs });
                this.setState({ filter: popularTVs })
            })
    }

    clear = () => {
        const titleSearch = ""
        this.setState({ titleSearch });
    }

    handleSearchChange(event) {
        const { value } = event.target;
        this.setState({ titleSearch: value });
        var filter = this.state.popularTVs.filter(content => (
            content.name.toLowerCase().includes(value.toLowerCase()) &&
            content.vote_average >= parseFloat(this.state.rating)
        ));
        if (this.state.sorted === "pop") {
            filter.sort(function (a, b) { return b.popularity - a.popularity });
        } else {
            filter.sort(function (a, b) { return b.vote_average - a.vote_average });
        }
        if (this.state.order === "descending") {
            filter.reverse();
        }
        this.setState({ filter });
    }

    handleOrderChange = key => (event, value) => {
        const filter = this.state.filter.slice().reverse();
        this.setState({ filter });
        this.setState({
            [key]: value
        });
    };

    handleRatingChange(event) {
        const { value } = event.target;
        this.setState({ rating: value });
        var filter = this.state.popularTVs.filter(content => (
            content.name.toLowerCase().includes(this.state.titleSearch.toLowerCase()) &&
            content.vote_average >= parseFloat(value)
        ));
        if (this.state.sorted === "pop") {
            filter.sort(function (a, b) { return b.popularity - a.popularity });
        } else {
            filter.sort(function (a, b) { return b.vote_average - a.vote_average });
        }
        if (this.state.order === "descending") {
            filter.reverse();
        }
        this.setState({ filter });
    }

    handleSortByChange(event) {
        const { value } = event.target;
        this.setState({ sorted: value });
        var filter = this.state.filter.slice();
        if (value === "pop") {
            filter.sort(function (a, b) { return b.popularity - a.popularity });
        } else {
            filter.sort(function (a, b) { return b.vote_average - a.vote_average });
        }
        if (this.state.order === "descending") {
            filter.reverse();
        }
        this.setState({ filter });
    }

    render() {
        return (
            <div className="search">
                <div className="search-padding">
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
                                        defaultValue="ascending"
                                        name="radio-buttons-group"
                                        onChange={this.handleOrderChange("order")}
                                    >
                                        <div className="item">
                                            <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                                            <FormControlLabel value="descending" control={<Radio />} label="Descending" />
                                        </div>
                                    </RadioGroup>
                                    <div className="bar">
                                        <FormControl className="bar">
                                            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                label="rating"
                                                defaultValue="0"
                                                onChange={this.handleRatingChange}
                                                className="bar-input"
                                            >
                                                <MenuItem value="0">All Shows</MenuItem>
                                                <MenuItem value="9">Greater than 9</MenuItem>
                                                <MenuItem value="8">Greater than 8</MenuItem>
                                                <MenuItem value="7">Greater than 7</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="bar">
                                        <FormControl className="bar">
                                            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                label="sort"
                                                defaultValue="pop"
                                                onChange={this.handleSortByChange}
                                                className="bar-input"
                                            >
                                                <MenuItem value="pop">Popularity</MenuItem>
                                                <MenuItem value="rate">Rating</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
                <div className="results">
                    {this.state.filter.map((content) => (
                        <div className="card" key={content.id}>
                            <a href={"/mp2/Content/" + content.id}>
                                <Card>
                                    <CardContent className="card-content">
                                        <div className="card-supp-details">
                                            <h1> {content.rank+1 + " " + content.name} </h1>
                                            <h3>
                                                Average Score: {content.vote_average} <FontAwesomeIcon icon={faStar} />
                                            </h3>
                                        </div>
                                        <img className="img" src={"https://image.tmdb.org/t/p/w500" + content.poster_path} alt={content.name} />
                                    </CardContent>
                                </Card>
                            </a>
                        </div>
                    ))}
                    <div className="card" key="end">
                        <Card>
                            <CardContent className="card-content">
                                <p>End of Results. Visit <a href="https://www.themoviedb.org/?language=en-US">TMDB</a> for more great content.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListView;