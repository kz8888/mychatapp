import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Chat App</h2>
        </div>
        <Chat />
      </div>
    );
  }
}

export default App;
