import React, { Component } from 'react';
import './App.css';
import FormElements from './FormElements'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import JsonOutput from './JsonOutput';

class Container extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      ffn: '',
      type: props.type,
      escalationQueues: [],
      deEscalationQueues: []
    }
  }

  handleClick(e, data) {
    console.log(data);
  }

  updateEscalationQueues = () => {
    console.log(this);
  };

  updateDeEscalationQueues = () => {
    console.log(this);
  };

  updateName = (value) => {
    this.setState({
      name: value
    });
  };

  updateFFN = (value) => {
    this.setState({
      ffn: value
    });
  };

  getCurrentState = () => {
    return {
      name: this.state.name,
      ffn: this.state.ffn,
      type: this.state.type,
      escalationQueues: this.state.escalationQueues,
      deEscalationQueues: this.state.deEscalationQueues
    };
  };

  render() {
    return (
      <div>
        <ContextMenuTrigger id={this.props.id}>
          <div className='container'>
            <FormElements fields={
              {
                "Name": {
                  onTextUpdate: this.updateName
                },
                "FFN": {
                  onTextUpdate: this.updateFFN
                }
              }
            }/>
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={this.props.id}>
          <MenuItem data={ {"some_data": this.props} } onClick={this.updateEscalationQueues}>
            Create Escalation Link
          </MenuItem>
          <MenuItem data={ {"some_data": this.props} } onClick={this.updateDeEscalationQueues}>
            Create De-escalation Link
          </MenuItem>
        </ContextMenu>
        <JsonOutput value={this.getCurrentState()}/>
      </div>
    );
  }
}

export default Container;