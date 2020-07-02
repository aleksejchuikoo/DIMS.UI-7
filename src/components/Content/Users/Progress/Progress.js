import React, { Component } from 'react';
import '../Users.sass';

export default class Progress extends Component {
  render() {
    const { hash } = this.props;
    return (
      <div className='user__task'>
        <div className='users__wrapper'>
          <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
            {hash}
          </div>
          <div className='users__wrapper_item'>
            <button className='userInfo'>Task</button>
          </div>
          <div className='users__wrapper_item'>Note</div>
          <div className='users__wrapper_item'>Date</div>
        </div>
      </div>
    );
  }
}
