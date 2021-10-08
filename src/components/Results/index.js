import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Results extends Component {
  render() {
    return (
      <div className="Results">
        {this.props.movies.map((movie) => (
          <div className="Results-item" key={movie.original_title}>
            <div >
              {movie.original_title}
            </div>

          </div>
        ))}
      </div>
    );
  }
}

Results.propTypes = {
  emojis: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

Results.defaultProps = {
  emoji: []
}

export default Results;
