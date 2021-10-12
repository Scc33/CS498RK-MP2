import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import './styles.scss'

export default class DetailView extends Component {
    render() {
        return (
            <div className="text">
                <div className="row">
                    <h1>Number {this.props.ranking} - {this.props.tv.name}</h1>
                </div>
                <div className="spaced">
                    <Button variant="contained" href={this.props.prev}>Previous</Button>
                    <div className="column fit">
                        <h3>Overview</h3>
                        {this.props.tv.overview}
                        <div className="row">
                            <div className="column padding-right">
                                <h4>Locality</h4>
                                <div>
                                    Original Language: {this.props.tv.original_language}
                                </div>
                                <div>
                                    Origin County: {this.props.tv.origin_country}
                                </div>
                            </div>
                            <div className="column">
                                <h4>More Details</h4>
                                <div>
                                    Popularity: {this.props.tv.popularity}
                                </div>
                                <div>
                                    Release Date: {this.props.tv.first_air_date}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h3>Rating</h3>
                        <div>
                            Average Score: {this.props.tv.vote_average}
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        Number of Votes: {this.props.tv.vote_count}
                    </div>
                    <div className="column">
                        <img className="img" src={"https://image.tmdb.org/t/p/w500" + this.props.tv.poster_path} alt={this.props.tv.name} />
                    </div>
                    <Button variant="contained" href={this.props.next}>Next</Button>

                </div>
            </div >
        );
    }
}

DetailView.propTypes = {
    ranking: PropTypes.number.isRequired,
    prev: PropTypes.string.isRequired,
    next: PropTypes.string.isRequired,
    tv: PropTypes.object.isRequired
};