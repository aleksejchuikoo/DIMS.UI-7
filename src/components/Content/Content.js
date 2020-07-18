import React, { Component } from 'react';
import './Content.sass';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Users from './Users/Users';
import NewUser from './NewUser/NewUser';
import Tasks from './Tasks/Tasks';
import NewTask from './NewTask/NewTask';
import UserTasks from './Users/UserTasks';
import UserProgress from './Users/Progress/UserProgress';
import Error from './404/Error';
import About from './About/About';
import fire from '../../config/Fire';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tasks: [],
      userTasks: [],
    };
  }

  componentDidMount() {
    const db = fire.firestore();
    db.collection('Data').onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      this.setState({
        data,
      });
    });

    db.collection('Tasks').onSnapshot((querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      this.setState({
        tasks,
      });
    });
  }

  failStatus = (fail, task, idTask) => {
    const { tasks } = this.state;
    const selectedItem = tasks.findIndex((item) => item.id === idTask);
    const firstArr = tasks.slice(0, selectedItem);
    const secondArr = tasks.slice(selectedItem + 1);

    this.setState({
      tasks: [...firstArr, { ...task, status: fail }, ...secondArr],
    });
  };

  successStatus = (success, task, idTask) => {
    const { tasks } = this.state;
    const selectedItem = tasks.findIndex((item) => item.id === idTask);
    const firstArr = tasks.slice(0, selectedItem);
    const secondArr = tasks.slice(selectedItem + 1);

    this.setState({
      tasks: [...firstArr, { ...task, status: success }, ...secondArr],
    });
  };

  handleCheckbox = (id, number, user) => {
    const { data } = this.state;
    const selectedItem = data.findIndex((item) => item.id === id);

    const { isActive } = data[selectedItem];

    const firstArr = data.slice(0, selectedItem);
    const secondArr = data.slice(selectedItem + 1);

    this.setState({
      data: [...firstArr, { ...data[selectedItem], isActive: !isActive }, ...secondArr],
    });

    const db = fire.firestore();
    db.collection('Data')
      .doc(id)
      .update({
        ...user,
        isActive: !user.isActive,
      })
      .catch((err) => {
        console.log('Error handleEdit', err.message);
      });
  };

  handleEdit = (editData, idData) => {
    const db = fire.firestore();

    db.collection('Data')
      .doc(idData)
      .update({
        ...editData,
      })
      .catch((err) => {
        console.log('Error handleEdit', err.message);
      });
  };

  handleEditTask = (editTask, idTask) => {
    const db = fire.firestore();
    db.collection('Tasks')
      .doc(idTask)
      .update({
        ...editTask,
      })
      .catch((err) => {
        console.log('Error handleEditTask', err.message);
      });
  };

  handleDeleteTask = (id) => {
    const db = fire.firestore();
    db.collection('Tasks')
      .doc(id)
      .delete();

    db.collection('Tasks').onSnapshot((querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      this.setState({
        tasks,
      });
    });
  };

  handleDelete = (id) => {
    const db = fire.firestore();
    db.collection('Data')
      .doc(id)
      .delete();

    db.collection('Data').onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      this.setState({
        data,
      });
    });
  };

  render() {
    const { data, tasks } = this.state;
    const { isDark } = this.props;
    return (
      <div className='content'>
        <Switch>
          <Route exact path='/' component={About} />

          <Route path='/users' exact>
            <Users data={data} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
          </Route>

          <Route path='/users/:id/tasks'>
            <UserTasks tasks={tasks} data={data} failStatus={this.failStatus} successStatus={this.successStatus} />
          </Route>

          <Route path='/users/:id/progress'>
            <UserProgress data={data} tasks={tasks} />
          </Route>

          <Route path='/new-user'>
            <NewUser transferData={this.transferData} isDark={isDark} />
          </Route>

          <Route path='/tasks'>
            <Tasks
              tasks={tasks}
              handleDelete={this.handleDeleteTask}
              handleEdit={this.handleEditTask}
              data={data}
              isDark={isDark}
              handleCheckbox={this.handleCheckbox}
            />
          </Route>

          <Route path='/new-task'>
            <NewTask
              transferTasks={this.transferTasks}
              data={data}
              handleCheckbox={this.handleCheckbox}
              isDark={isDark}
            />
          </Route>

          <Route path='*' component={Error} />
        </Switch>
      </div>
    );
  }
}
