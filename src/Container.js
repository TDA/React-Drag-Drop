import React, { Component } from 'react';
import './App.css';
import FormElements from './FormElements'

class Container extends Component {
  render() {
    return (
      <div className='container'>
        <FormElements />
      </div>
    );
  }
}

export default Container;