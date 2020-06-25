import React, { Component } from 'react';

export default class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return <div>{this.props.name}</div>;
  }
}
