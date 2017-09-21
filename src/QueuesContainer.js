import React, { Component } from 'react';
import './App.css';
import FormElements from './FormElements'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import JsonOutput from './JsonOutput';

class QueuesContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      displayName: '',
      id: '',
      type: '',
      tenant: props.tenant || '',
      allowedCaseTypes: props.allowedCaseTypes || [],
      escalation: props.escalation || [],
      deEscalation: props.deEscalation || [],
      SLA: {
        SLA_day: 30
      }
    }
  }

  handleClick(e, data) {
    console.log(data);
  }

  showEscalationQueues = () => {
    this.props.updateSelectableFields(this.props.index, 'escalation');
  };

  showDeEscalationQueues = () => {
    this.props.updateSelectableFields(this.props.index, 'deEscalation');
  };

  updateName = (value) => {
    this.setState({
      displayName: value
    });
  };

  updateFQRN = (value) => {
    this.setState({
      id: value.slice(0, -4),
      type: value
    });
  };

  updateSLA = (value) => {
    let SLA = {
      SLA_day: value
    };
    this.setState({
      SLA: SLA
    });
  };

  isSelectable = (value) => {
    return value ? 'selectable': '';
  };

  createLink = () => {
    if (this.props.selectable) {
      this.props.createLink(this.state.id);
    }
  };

  getJsonState = () => {
    let state = Object.assign({}, this.state);
    delete state.tenant;
    return state;
  };

  render() {
    return (
      <div>
        <ContextMenuTrigger id={this.props.id}>
          <div className={'container ' + this.isSelectable(this.props.selectable)} onDoubleClick={this.createLink}>
            <FormElements fields={
              {
                "Display Name": {
                  onTextUpdate: this.updateName
                },
                "FQRN": {
                  onTextUpdate: this.updateFQRN,
                  defaultValue: `n.q.${this.state.tenant}.`
                },
                "SLA": {
                  onTextUpdate: this.updateSLA
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
        <JsonOutput value={this.getJsonState()}/>
      </div>
    );
  }
}

export default QueuesContainer;