import * as React from 'react';
import { Component } from 'react';
import {
  Route,
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import './App.css';
import ListView from './components/ListView';
import Gallery from './components/GalleryView/Gallery';
import axios from 'axios'
import DetailView from './components/DetailView';

class App extends Component {
  state = {
    popularTVs: []
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=f052c50e624989f8ef4a5acc45dfc7f2&language=en-US&page=1')
      .then(res => {
        const popularTVs = res.data.results;
        console.log(popularTVs)
        this.setState({ popularTVs });
      })
  }

  render() {
    var details = [];
    for (var i = 0; i < this.state.popularTVs.length; i++) {
      var p = i - 1;
      var n = i + 1;
      if (i === 0) {
        p = this.state.popularTVs.length - 1;
      }
      if (i === this.state.popularTVs.length - 1) {
        n = 0;
      }
      details.push(<Route key={this.state.popularTVs[i].id} path={"/mp2/Content/" + this.state.popularTVs[i].id}>
        <DetailView
          key={this.state.popularTVs[i].id}
          ranking={i + 1}
          tv={this.state.popularTVs[i]}
          prev={"/mp2/Content/" + this.state.popularTVs[p].id}
          next={"/mp2/Content/" + this.state.popularTVs[n].id}
        />
      </Route >);
    }
    return (
      <div className="section">
        <div className="menu">
          <h1 className="header">Movies</h1>
          <div className="menu-link">
            <Button variant="contained" href="/mp2/ListView">Search</Button>
          </div>
          <div className="menu-link">
            <Button variant="contained" href="/mp2/Gallery">Gallery</Button>
          </div>
        </div>
        <div className="item">
          <Route path="/mp2/" exact component={ListView} />
          <Route path="/mp2/ListView" exact component={ListView} />
          <Route path="/mp2/Gallery" exact component={Gallery} />
          {details}
        </div>
      </div>
    )
  }
}

export default App;
