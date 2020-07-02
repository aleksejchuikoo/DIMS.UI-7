import React, { Component } from 'react';
import './Users.sass';
import Task from '../Tasks/Task';
import Back from '../../UI/Back';

export default class UserTasks extends Component {
  render() {
    const { tasks } = this.props;
    return (
      <div className='users'>
        <Back />
        <div className='users__tasks-title'>
          {this.props.tasks.length ? (
            <p className='task-title'>
              <i className='fa fa-tasks'></i> User tasks
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
                <div className='users__title-name'>name</div>
                <div className='users__title-name'>start</div>
                <div className='users__title-name'>deadline</div>
                <div className='users__title-name'>status</div>
                <div className='users__title-name'>Mark</div>
              </div>
              {tasks.map((item, i) => {
                return <Task key={i} hash={i + 1} />;
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
