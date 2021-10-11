import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'

export default class DetailView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <h1>{this.props.ranking}</h1>
                <h1>{this.props.tv.name}</h1>
                {this.props.tv.overview}
                <div>
                    Average Score: {this.props.tv.vote_average} <FontAwesomeIcon icon={faStar} />
                </div>
                <div>
                    Number of Votes: {this.props.tv.vote_count}
                </div>
                <div>
                    Release Date: {this.props.tv.first_air_date}
                </div>
                {this.props.tv.origin_country}
                {this.props.tv.original_language}
                {this.props.tv.popularity}
                <img className="img" src={"https://image.tmdb.org/t/p/w500" + this.props.tv.poster_path} />
                {this.props.tv.prev}
                <a href={this.props.prev}>Previous</a>
                <a href={this.props.next}>Next</a>
            </section>
        );
    }
}