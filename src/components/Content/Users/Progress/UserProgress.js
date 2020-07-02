import React, { Component } from 'react';
import '../Users.sass';
import Progress from './Progress';
import Back from '../../../UI/Back';

export default class UserProgress extends Component {
  render() {
    const { tasks } = this.props;
    return (
      <div className='users'>
        <Back />
        <div className='users__tasks-title'>
          {this.props.tasks.length ? (
            <p className='task-title'>
              <i className='fa fa-calendar'></i> User progress
            </p>
          ) : (
            <p className='task-warning'>
              <i className='fa fa-warning'></i> This user has no tasks
            </p>
          )}
        </div>
        <div className='users__tasks'>
          {this.props.tasks.length ? (
            <div className='users users-animation'>
              <div className='users__title'>
                <div className='users__title-name'>#</div>
                <div className='users__title-name'>Task</div>
                <div className='users__title-name'>Note</div>
                <div className='users__title-name'>Date</div>
              </div>
              {tasks.map((item, i) => {
                return <Progress key={i} hash={i + 1} />;
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
