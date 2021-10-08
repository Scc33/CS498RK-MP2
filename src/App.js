import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

import Search from './components/Search';
import Gallery from './components/Gallery';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Container maxWidth="xs">
        <div className="App">
          <header className="App-header">
            <h1>Movies</h1>
            <Grid item>
              <Link to="/"><Button variant="contained" onclick="/">Home</Button></Link>
              <Link to="/Search"><Button variant="contained">Search</Button></Link>
              <Link to="/Gallery"><Button variant="contained">Gallery</Button></Link>
            </Grid>
            <Switch>
              <Route path="/Search">
                <Search />
              </Route>
              <Route path="/Gallery">
                <Gallery />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </header>
        </div>
      </Container>
    </Router>
  );
}

export default App;

//https://codepen.io/gaearon/pen/LzWZvb?editors=0010
//https://gitlab.com/uiuc-web-programming/react-demo
//https://uiuc-web-programming.gitlab.io/fa21/slides/routing_and_state_11.pdf (routing/state)
//https://gitlab.com/uiuc-web-programming/mp2
//https://developer.marvel.com/account
