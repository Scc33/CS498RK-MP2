import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Results extends Component {
  render() {
    return (
      <div className="Results">
        {this.props.movies.map((movie) => (
          <div className="Results-item" key={movie.original_title}>
            <div>
              <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
            </div>
            <div>
              {movie.original_title}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Results.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      original_title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  ).isRequired
};

Results.defaultProps = {
  movies: []
}

export default Results;
