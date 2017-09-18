import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

class TextField extends Component {
  render() {
    return (
      <input type="text"
             name={this.props.fieldName}
             id={this.props.fieldName}
             className={this.props.className}
             onInput={this.props.onTextChange}
             onBlur={this.props.onBlur}
             onKeyDown={this.props.onKeyDown}
             tabIndex={1}
      />
    );
  }
}

class SpanField extends Component {
  render() {
    return (
      <FormControl.Static id={this.props.fieldName}
            className={"editable " + this.props.className}
            onClick={this.props.onEditableFieldClick}
      >
        {this.props.fieldValue}
      </FormControl.Static>
    );
  }
}

class EditableField extends Component {
  constructor(props) {
    super(props);
    this.fieldName = props.fieldName;
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleInputFieldBlur = this.handleInputFieldBlur.bind(this);
    this.handleEditableFieldClick = this.handleEditableFieldClick.bind(this);
    this.state = {
      hideInputField: false,
      hideEditableField: true
    };
  }

  handleTextChange(e) {
    this.setState({fieldValue: e.target.value});
  }

  handleInputFieldBlur(e) {
    this.setState({
      hideInputField: true,
      hideEditableField: false
    });

    if (this.props.callbacks.onTextUpdate) {
      this.props.callbacks.onTextUpdate(e.target.value);
    }
  }

  handleEditableFieldClick(e) {
    this.setState({
      hideInputField: false,
      hideEditableField: true
    });
  }

  setHiddenState(isHidden) {
    return isHidden? "hidden" : "";
  }

  keyDown = (e) => {
    if(e.keyCode === 13) { this.handleInputFieldBlur(e) }           // Enter
    else if (e.keyCode === 27) { this.handleInputFieldBlur(e) }     // Escape, needs to reset field to before
  };

  render() {
    return (
      <div>
        <label htmlFor={this.fieldName}>{this.fieldName}: </label>
        <TextField fieldName={this.fieldName}
                   onTextChange={this.handleTextChange}
                   onBlur={this.handleInputFieldBlur}
                   onKeyDown={this.keyDown}
                   className={this.setHiddenState(this.state.hideInputField)}
        />
        <SpanField fieldName={this.fieldName + "Editable"}
                   fieldValue={this.state.fieldValue}
                   onEditableFieldClick={this.handleEditableFieldClick}
                   className={this.setHiddenState(this.state.hideEditableField)}
        />
      </div>
    );
  }
}

export default class FormElements extends Component {
  render() {
    let fieldset = this.props.fields;
    let fields = [];
    for (let field in fieldset) {
      fields.push(<EditableField fieldName={field} callbacks={fieldset[field]} key={field}/>)
    }
    return (
      <div>
        {fields}
      </div>
    );
  }
}
