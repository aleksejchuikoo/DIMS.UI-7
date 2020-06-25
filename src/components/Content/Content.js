import React, { Component } from 'react';
import './Content.sass';
import Users from './Users/Users';
import NewUser from './NewUser/NewUser';
import Tasks from './Tasks/Tasks';
import NewTask from './NewTask/NewTask';
import { Route } from 'react-router-dom';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'aleksejasfasf',
    };
  }
  render() {
    return (
      <div className='content'>
        <Route path='/users' exact>
          <Users name={this.state.name} />
        </Route>

        <Route path='/new-user'>
          <NewUser />
        </Route>

        <Route path='/tasks'>
          <Tasks />
        </Route>

        <Route path='/new-task'>
          <NewTask />
        </Route>
      </div>
    );
  }
}
