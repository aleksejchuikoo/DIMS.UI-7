import React, { Component } from 'react';
import './Buttons.sass';

export default class RadioButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value.toLowerCase(),
    };
  }

  handleRadioChange = (e) => {
    const { changeRadio, name } = this.props;
    let val = e.target.value;
    this.setState({
      value: val,
    });

    changeRadio(val, name);
  };

  render() {
    const { value } = this.props;
    return (
      <div className='radio-group'>
        <label className='radio'>
          <input type='radio' value='male' name='gender' checked={value === 'male'} onChange={this.handleRadioChange} />
          male
          <span></span>
        </label>
        <label className='radio'>
          <input
            type='radio'
            value='female'
            name='gender'
            checked={value === 'female'}
            onChange={this.handleRadioChange}
          />
          female
          <span></span>
        </label>
      </div>
    );
  }
}
