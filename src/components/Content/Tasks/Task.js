import React, { Component } from 'react';
import { Button } from '../../UI/Buttons';

export class Task extends Component {
  render() {
    const { hash } = this.props;
    return (
      <div className='user__task'>
        <div className='users__wrapper'>
          <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
            {hash}
          </div>
          <div className='users__wrapper_item'>
            <button className='userInfo'>Name</button>
          </div>
          <div className='users__wrapper_item'>start</div>
          <div className='users__wrapper_item'>deadline</div>
          <div className='users__wrapper_item'>status</div>
          <div className='users__wrapper_item users__wrapper_item-marks'>
            <Button action='delete'>
              <i className='fa fa-thumbs-down'></i>
            </Button>
            <Button action='create'>
              <i className='fa fa-thumbs-up'></i>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
