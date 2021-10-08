import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Results extends Component {
  render() {
    return (
      <div className="Results">
        {this.props.emojis.map((emoji) => (
          <div className="Results-item" key={emoji.title}>
            <div className="Results-symbol">
              {emoji.symbol}
            </div>
            <div className="Results-title">
              {emoji.title}
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
