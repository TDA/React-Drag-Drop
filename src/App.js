import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dragula from 'react-dragula';
import Container from './Container'
import FormElements from "./FormElements";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQueues: props.numberOfQueues
    }
  }

  updateNumberOfQueues = (value) => {
    this.setState({
      numberOfQueues: value
    });
  };

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        revertOnSpill: true,
        direction: 'horizontal'
      };
      Dragula([componentBackingInstance], options);
    }
  };

  render() {
    let containers = [];
    for (let i = 0; i < this.state.numberOfQueues; i++) {
      containers.push(<Container key={i}/>);
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Drag Drop</h2>
        </div>
        <FormElements fields={["Number of queues"]} onTextUpdate={this.updateNumberOfQueues}/>
        <div className="parent-container" ref={this.dragulaDecorator}>
          {containers}
        </div>
      </div>
    );
  }
}

export default App;
