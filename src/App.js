import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
      <Container>
        <div className="App">
          <header className="App-header">
            <h1>Movies</h1>
            <Grid item>
              <Button variant="contained" href="/">Home</Button>
              <Button variant="contained" href="/Search">Search</Button>
              <Button variant="contained" href="/Gallery">Gallery</Button>
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