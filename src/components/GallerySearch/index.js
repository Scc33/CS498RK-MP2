import { Component } from 'react';
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import './styles.scss';

class GallerySearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => { }
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    return (
      <div className="Search">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={this.handleChange} />
      </div>
    );
  }
}

export default GallerySearch;
