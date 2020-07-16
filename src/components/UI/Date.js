import React, { Component } from 'react';

export default class Date extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      error: false,
    };
  }

  handleChange = (e) => {
    let val = e.target.value;
    const { changeDate, name } = this.props;

    if (val) {
      if (val.length === 2 || val.length === 5) {
        val += '/';
        this.setState({
          value: val,
        });
      } else if (val.length === 11) {
        return;
      } else {
        this.setState({
          value: val,
        });
      }

      changeDate(val, name);
    }
  };

  onKeyDown = (e) => {
    const { value } = this.state;
    const { changeDate, name } = this.props;
    const eventKey = e.key;
    const splitValue = value.split('');

    if (eventKey === 'Backspace') {
      let val = splitValue.slice(0, splitValue.length - 1).join('');

      if (val.length === 3 || val.length === 6) {
        val = val.slice(0, val.length - 1);
        this.setState({
          value: val,
        });
      } else if (val.length === 1) {
        this.setState({
          value: '',
        });
      } else {
        this.setState({
          value: val,
        });
      }
      changeDate(value, name);
    }
  };

  render() {
    const { placeholder, value } = this.props;

    return (
      <div>
        <input
          type='text'
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDown}
          onError={() => this.onError()}
        />
      </div>
    );
  }
}
