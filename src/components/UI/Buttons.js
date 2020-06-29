import React, { Component } from 'react';
import './Buttons.sass';

export function CrossButton(props) {
  return (
    <button className='btn btn-cross' onClick={props.handleButton}>
      {props.children}
    </button>
  );
}

export function Button(props) {
  return (
    <button className={props.action ? `btn btn-${props.action}` : 'btn'} onClick={props.handleButton}>
      {props.children}
    </button>
  );
}

export function CheckboxButton(props) {
  return (
    <div className={`theme-switcher-label ${props.isActive ? 'active' : ''}`} onClick={props.handleChechbox}>
      <div className='switch-path'>
        <div className='switch-handle'></div>
      </div>
    </div>
  );
}

export class RadioButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  handleRadioChange = (e) => {
    let val = e.target.value;
    this.setState({
      value: e.target.value,
    });

    this.props.changeRadio(val, this.props.name);
  };

  render() {
    return (
      <div className='radio-group'>
        <label className='radio'>
          <input
            type='radio'
            value='male'
            name='gender'
            checked={this.state.value === 'male'}
            onChange={this.handleRadioChange}
          />{' '}
          male
          <span></span>
        </label>
        <label className='radio'>
          <input
            type='radio'
            value='female'
            name='gender'
            checked={this.state.value === 'female'}
            onChange={this.handleRadioChange}
          />{' '}
          female
          <span></span>
        </label>
      </div>
    );
  }
}
