import React, { Component } from 'react';
import './Users.sass';
import Task from '../Tasks/Task';
import Back from '../../UI/Back';
import { withRouter } from 'react-router-dom';

class UserTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      tasks: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const id = props.match.params.id;

    const { data, tasks } = props;

    const dataItem = data.find((item) => item.id === id);
    const dataTask = tasks.filter((item) => item.idMembers.includes(id));

    return {
      ...state,
      name: dataItem.firstName,
      tasks: [...state.tasks, ...dataTask],
    };
  }

  render() {
    const { name, tasks } = this.state;
    const { failStatus, successStatus } = this.props;
    return (
      <div className='users'>
        <Back />
        <div className='users__tasks-title'>
          {tasks.length ? (
            <p className='task-title'>
              <i className='fa fa-tasks'></i> {name} tasks
            </p>
          ) : (
            <p className='task-warning'>
              <i className='fa fa-warning'></i> This user has no tasks
            </p>
          )}
        </div>
        <div className='users__tasks'>
          {tasks.length ? (
            <div className='users users-animation'>
              <div className='users__title'>
                <div className='users__title-name'>#</div>
                <div className='users__title-name'>name</div>
                <div className='users__title-name'>start</div>
                <div className='users__title-name'>deadline</div>
                <div className='users__title-name'>description</div>
                <div className='users__title-name'>status</div>
                <div className='users__title-name'>Mark</div>
              </div>
              {tasks.map((item, i) => {
                return (
                  <Task key={item.id} hash={i + 1} tasks={item} failStatus={failStatus} successStatus={successStatus} />
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(UserTasks);
