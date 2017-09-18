import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import CopyToClipboard from 'react-copy-to-clipboard';


class JsonOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
  }
  render() {
    let value = JSON.stringify(this.props.value, null, 2);
    return (
      <div>
        <pre className="pre">
          {value}
        </pre>

        <CopyToClipboard text={value} onCopy={() => this.setState({copied: true})}>
          <Button tabIndex="5">Copy to clipboard</Button>
        </CopyToClipboard>

        {this.state.copied ? <span style={{color: 'red'}}>Copied</span> : null}
      </div>
    );
  }
}

export default JsonOutput;
