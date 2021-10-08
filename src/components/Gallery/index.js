import { Component } from 'react';

import Header from '../Header';
import Search from '../Search';
import Results from '../Results';

import emojis from "../../emojis.json";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = { emojis }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    const { value } = event.target;
    const filtered = emojis.filter(emoji => (
      emoji.title.toLowerCase().includes(value.toLowerCase()) ||
      emoji.keywords.includes(value)
    ));

    this.setState({ emojis: filtered });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search onChange={this.handleSearchChange} />
        <Results emojis={this.state.emojis} />
      </div>
    );
  }
}

export default Gallery;
