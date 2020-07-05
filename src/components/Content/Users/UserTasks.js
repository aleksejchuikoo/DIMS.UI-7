import React, { Component } from 'react';
import './Users.sass';
import Task from '../Tasks/Task';
import Back from '../../UI/Back';
import { withRouter } from 'react-router-dom';

class UserTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Name',
      tasks: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const id = props.match.params.id;

    const { data } = props;
    console.log(data);

    const dataItem = data.find((item) => {
      return item.id === id;
    });

    return {
      ...state,
      name: dataItem.firstName,
    };
  }

  render() {
    const { tasks } = this.props;
    const { name } = this.state;
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
                <div className='users__title-name'>status</div>
                <div className='users__title-name'>Mark</div>
              </div>
              {tasks.map((item, i) => {
                return <Task key={i} hash={i + 1} tasks={item} />;
              })}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(UserTasks);
