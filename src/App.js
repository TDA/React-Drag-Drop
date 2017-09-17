import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './react-context-menu.css';
import Dragula from 'react-dragula';
import Container from './Container'
import FormElements from "./FormElements";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQueues: props.numberOfQueues,
      type: props.type,
      selectableFields: new Array(props.numberOfQueues).fill(false)
    }
  }

  updateNumberOfQueues = (value) => {
    this.setState({
      numberOfQueues: value,
      selectableFields: new Array(Number.parseInt(value, 10)).fill(false)
    });
  };

  updateType = (value) => {
    this.setState({
      type: value
    });
  };

  updateSelectableFields = (index, order) => {
    let selectableFields = this.state.selectableFields.slice();
    if (order === 'escalate') {
      console.log('esc', index);
      selectableFields = selectableFields.map((v, i) => {
        console.log(i);return i > index; });
    } else if (order === 'deEscalate') {
      console.log('deEsc', index);
      selectableFields = selectableFields.map((v, i) => { return i < index; });
    }
    console.log(selectableFields);
    this.setState({
      selectableFields: selectableFields
    });
  };

  dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {
        revertOnSpill: true,
        direction: 'horizontal',
        invalid: function (el) {
          return el.classList.contains('pre');
        }
      };
      Dragula([componentBackingInstance], options);
    }
  };

  render() {
    let containers = [];
    for (let i = 0; i < this.state.numberOfQueues && this.state.type; i++) {
      containers.push(<Container key={i} index={i} id={"queue"+i} type={this.state.type} selectable={this.state.selectableFields[i]} updateSelectableFields={this.updateSelectableFields}/>);
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Drag Drop</h2>
        </div>
        <FormElements fields={
          {
            "Number of queues": {
              onTextUpdate: this.updateNumberOfQueues
            },
            "Type": {
              onTextUpdate: this.updateType
            }
          }
        }
        />
        <div className="parent-container" ref={this.dragulaDecorator}>
          {containers}
        </div>
      </div>
    );
  }
}

export default App;
