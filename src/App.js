import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dragula from 'react-dragula';
import Container from './Container'

class App extends Component {
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        revertOnSpill: true
      };
      Dragula([componentBackingInstance], options);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Drag Drop</h2>
        </div>
        <div className="cont" ref={this.dragulaDecorator}>
          <Container />
          <Container />
          <Container />
        </div>
      </div>
    );
  }
}

export default App;
