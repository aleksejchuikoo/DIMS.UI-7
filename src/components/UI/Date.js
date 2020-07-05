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
    let val = e.target.value,
      regExp = /\d+/g;

    if (regExp.test(val)) {
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

      this.props.changeDate(val, this.props.name);
    }
  };

  onKeyDown = (e) => {
    let eventKey = e.key,
      splitValue = this.state.value.split('');

    if (eventKey === 'Backspace') {
      let val = splitValue.slice(0, splitValue.length).join('');

      if (val[val.length - 1] === '/') {
        this.setState({
          value: val.slice(0, splitValue.length - 1),
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
