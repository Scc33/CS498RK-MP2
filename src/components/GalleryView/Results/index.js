import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Results extends Component {
  render() {
    return (
      <div className="Results">
        {this.props.content.map((show) => (
          <div className="Results-item" key={show.id}>
            <a href={"/mp2/Content/" + show.id}>
              <img
                className="img"
                src={"https://image.tmdb.org/t/p/w500" + show.poster_path}
                alt={show.name}
              />
            </a>
          </div>
        ))}
      </div>
    );
  }
}

Results.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

Results.defaultProps = {
  content: []
}

export default Results;
