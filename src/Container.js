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
      escalationQueues: this.props.escalationQueues || [],
      deEscalationQueues: this.props.deEscalationQueues || []
    }
  }

  handleClick(e, data) {
    console.log(data);
  }

  showEscalationQueues = () => {
    this.props.updateSelectableFields(this.props.index, 'escalate');
  };

  showDeEscalationQueues = () => {
    this.props.updateSelectableFields(this.props.index, 'deEscalate');
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

  isSelectable = (value) => {
    return value ? 'selectable': '';
  };

  render() {
    return (
      <div>
        <ContextMenuTrigger id={this.props.id}>
          <div className={'container ' + this.isSelectable(this.props.selectable)} ondblclick={this.linkStates}>
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
          <MenuItem data={ {"some_data": this.props} } onClick={this.showEscalationQueues}>
            Create Escalation Link
          </MenuItem>
          <MenuItem data={ {"some_data": this.props} } onClick={this.showDeEscalationQueues}>
            Create De-escalation Link
          </MenuItem>
        </ContextMenu>
        <JsonOutput value={this.state}/>
      </div>
    );
  }
}

export default Container;