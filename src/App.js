import logo from './logo.svg';
import './App.css';

//https://codepen.io/gaearon/pen/LzWZvb?editors=0010
//https://gitlab.com/uiuc-web-programming/react-demo
//https://uiuc-web-programming.gitlab.io/fa21/slides/routing_and_state_11.pdf (routing/state)
//https://gitlab.com/uiuc-web-programming/mp2
//https://developer.marvel.com/account

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
