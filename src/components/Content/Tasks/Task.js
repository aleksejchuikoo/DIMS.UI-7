import React, { Component } from 'react';
import Button from '../../UI/Button';

export class Task extends Component {
  render() {
    const { hash, tasks } = this.props;
    return (
      <div className='user__task'>
        <div className='users__wrapper users__wrapper-tasks'>
          <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
            {hash}
          </div>
          <div className='users__wrapper_item'>
            <button className='userInfo'>{tasks.taskName}</button>
          </div>
          <div className='users__wrapper_item'>{tasks.startDate}</div>
          <div className='users__wrapper_item'>{tasks.deadlineDate}</div>
          <div className='users__wrapper_item'>
            {tasks.description.length > 10 ? tasks.description.slice(0, 9) + '..' : tasks.description}
          </div>
          <div className='users__wrapper_item'>In process</div>
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
