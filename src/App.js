import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dragula from 'react-dragula';

class App extends Component {
  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = { };
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
        <div className='container' ref={this.dragulaDecorator}>
          <div>Swap me around</div>
          <div>Swap her around</div>
          <div>Swap him around</div>
          <div>Swap them around</div>
          <div>Swap us around</div>
          <div>Swap things around</div>
          <div>Swap everything around</div>
        </div>
      </div>
    );
  }
}

export default App;
