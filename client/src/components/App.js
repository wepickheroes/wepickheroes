import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import { Navbar } from './layout'

class App extends Component {
  render() {
    return (
      <div>
          <Navbar/>

            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
      </div>
    );
  }
}

export default App;
