import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './react-context-menu.css';
// import Dragula from 'react-dragula';
import QueuesContainer from './QueuesContainer'
import FormElements from "./FormElements";
import DVTCGenerator from "./DVTCGenerator"

function EscDeEscObject() {
  this.escalation = [];
  this.deEscalation = [];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfQueues: props.numberOfQueues,
      allowedCaseTypes: props.allowedCaseTypes,
      selectableFields: new Array(props.numberOfQueues).fill(false),
      currentSelectedContainer: null,
      currentSelectedAction: null,
      tenant: null
    }
  }

  updateNumberOfQueues = (value) => {
    value = Number.parseInt(value, 10);
    let escDeEscMap = new Array(value).fill('');
    escDeEscMap = escDeEscMap.map(function () {
      return new EscDeEscObject();
    });
    this.setState({
      numberOfQueues: value,
      selectableFields: new Array(value).fill(false),
      escDeEscMap: escDeEscMap
    });
  };

  updateType = (value) => {
    value = value.split(",");
    this.setState({
      allowedCaseTypes: value
    });
  };

  updateTenant = (value) => {
    this.setState({
      tenant: value
    });
  };

  updateSelectableFields = (index, order) => {
    let selectableFields = this.state.selectableFields.slice();
    if (order === 'escalation') {
      selectableFields = selectableFields.map((v, i) => { return i > index; });
    } else if (order === 'deEscalation') {
      selectableFields = selectableFields.map((v, i) => { return i < index; });
    }
    this.setState({
      selectableFields: selectableFields,
      currentSelectedContainer: index,
      currentSelectedAction: order
    });
  };

  createLink = (ffn) => {
    let selectableFields = this.state.selectableFields.slice();
    let escDeEscMap = this.state.escDeEscMap.map(a => Object.assign({}, a));
    escDeEscMap[this.state.currentSelectedContainer][this.state.currentSelectedAction].push(ffn);
    this.setState({
      escDeEscMap: escDeEscMap,
      selectableFields: selectableFields.fill(false)
    });
  };

  render() {
    let containers = [];
    for (let i = 0; i < this.state.numberOfQueues && this.state.allowedCaseTypes && this.state.tenant; i++) {
      containers.push(<QueuesContainer key={i}
                                       index={i}
                                       id={"queue"+i}
                                       allowedCaseTypes={this.state.allowedCaseTypes}
                                       tenant={this.state.tenant}
                                       selectable={this.state.selectableFields[i]}
                                       updateSelectableFields={this.updateSelectableFields}
                                       createLink={this.createLink}
                                       escalation={this.state.escDeEscMap[i].escalation}
                                       deEscalation={this.state.escDeEscMap[i].deEscalation}
        />
      );
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Setup</h2>
        </div>
        <FormElements fields={
          {
            "Tenant": {
              onTextUpdate: this.updateTenant
            },
            "Number of queues": {
              onTextUpdate: this.updateNumberOfQueues
            },
            "Type": {
              onTextUpdate: this.updateType
            }
          }
        }
        />
        <div className="parent-container" >
          {containers}
        </div>
        <DVTCGenerator>

        </DVTCGenerator>
      </div>
    );
  }
}

export default App;
