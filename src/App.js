import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container maxWidth="xs">
      <div className="App">
        <header className="App-header">
          
          <Grid item>
            <Button variant="contained">Search</Button>
            <Button variant="contained">Gallery</Button>
          </Grid>
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

          </FormControl>
        </header>
      </div>
    </Container>
  )
}

export default App;

//https://codepen.io/gaearon/pen/LzWZvb?editors=0010
//https://gitlab.com/uiuc-web-programming/react-demo
//https://uiuc-web-programming.gitlab.io/fa21/slides/routing_and_state_11.pdf (routing/state)
//https://gitlab.com/uiuc-web-programming/mp2
//https://developer.marvel.com/account
