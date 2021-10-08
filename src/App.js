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
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function App() {
  return (
    <Router>
      <Container maxWidth="xs">
        <div className="App">
          <header className="App-header">
            <h1>Movies</h1>
            <Grid item>
              <Button variant="contained"><Link to="/">Home</Link></Button>
              <Button variant="contained"><Link to="/Search">Search</Link></Button>
              <Button variant="contained"><Link to="/Gallery">Gallery</Link></Button>
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

function Home() {
  return (
    <h1>Home</h1>
  )
}

function Search() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container>
      <Grid>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Grid>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <RadioGroup
        aria-label="gender"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      </FormControl>
    </Container>
  );
}

function Gallery() {
  return (
    <h1>Gallery</h1>
  )
}

export default App;

//https://codepen.io/gaearon/pen/LzWZvb?editors=0010
//https://gitlab.com/uiuc-web-programming/react-demo
//https://uiuc-web-programming.gitlab.io/fa21/slides/routing_and_state_11.pdf (routing/state)
//https://gitlab.com/uiuc-web-programming/mp2
//https://developer.marvel.com/account
