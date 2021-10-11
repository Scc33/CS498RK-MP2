import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import Modal from 'react-awesome-modal';
import DetailView from '../../DetailView/'

class Results extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.movies);
    const movieModalState = {};
    props.movies.forEach((item, index) => {
      console.log(item);
      //console.log(movieModalState);
      movieModalState[item] = { visible: 0 };
    });
    console.log(movieModalState)
    this.state = {
      modals: false
    }
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div className="Results">
        {this.props.movies.map((movie) => (
          <div className="Results-item" key={movie.original_title}>
            <div>
              <img
                className="img"
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                onClick={() => this.openModal()}
              />
            </div>
            <Modal
              visible={this.state.visible}
              width="400"
              height="300"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}
            >
              <div>
                <h1>Title</h1>
                <p>Some Contents</p>
                <a href="javascript:void(0);" onClick={() => this.closeMode()}>
                  Close
                </a>
              </div>
            </Modal>
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
