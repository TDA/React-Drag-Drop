import React, { Component } from 'react';

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
      />
    );
  }
}

class SpanField extends Component {
  render() {
    return (
      <span id={this.props.fieldName}
            className={"editable " + this.props.className}
            onClick={this.props.onEditableFieldClick}
      >
          {this.props.fieldValue}
        </span>
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

    if (this.props.otherProps.onTextUpdate) {
      console.log('Calling text update');
      this.props.otherProps.onTextUpdate(e.target.value);
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
    let fields = this.props.fields;
    let props = this.props;
    return (
      <div>
        {fields.map(function (name) {
          return <EditableField fieldName={name} otherProps={props} key={name}/>
        })}
      </div>
    );
  }
}
