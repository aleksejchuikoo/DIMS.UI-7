import React, { Component } from 'react';
import './Content.sass';
import { Route, Switch } from 'react-router-dom';
import Users from './Users/Users';
import NewUser from './NewUser/NewUser';
import Tasks from './Tasks/Tasks';
import NewTask from './NewTask/NewTask';
import UserTasks from './Users/UserTasks';
import UserProgress from './Users/Progress/UserProgress';
import Error from './404/Error';
import About from './About/About';
import fire from '../../config/Fire';
import Spinner from '../UI/Spinner';
import Tracks from './Tracks/Tracks';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tasks: [],
      userTasks: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.setState({
      isFetching: true,
    });

    setTimeout(this.delayData, 1500);
  }

  delayData = () => {
    const db = fire.firestore();
    db.collection('Members').onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      this.setState({
        data,
        isFetching: false,
      });
    });

    db.collection('Tasks').onSnapshot((querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      this.setState({
        tasks,
        isFetching: false,
      });
    });

    db.collection('UserTasks').onSnapshot((querySnapshot) => {
      const userTasks = [];
      querySnapshot.forEach((doc) => {
        userTasks.push(doc.data());
      });
      this.setState({
        userTasks,
        isFetching: false,
      });
    });
  };

  transferData = (dataUser) => {
    const { data } = this.state;
    this.setState({
      data: [...data, { ...dataUser }],
    });
  };

  transferTask = (task) => {
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, { ...task }],
    });
  };

  transferUserTasks = (userTask) => {
    const { userTasks } = this.state;
    this.setState({
      userTasks: [...userTasks, { ...userTask }],
    });
  };

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

  handleEdit = (editData, idData) => {
    const db = fire.firestore();

    db.collection('Members')
      .doc(idData)
      .update({
        ...editData,
      })
      .catch((err) => {
        console.log('Error handleEdit', err.message);
      });
  };

  handleEditTask = (editTask, idTask) => {
    const { tasks } = this.state;
    const db = fire.firestore();
    db.collection('Tasks')
      .doc(idTask)
      .update({
        ...editTask,
      })
      .catch((err) => {
        console.log('Error handleEditTask', err.message);
      });

    const selectedItem = tasks.findIndex((item) => item.id === idTask);
    const firstArr = tasks.slice(0, selectedItem);
    const secondArr = tasks.slice(selectedItem + 1);

    this.setState({
      tasks: [...firstArr, editTask, ...secondArr],
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

    db.collection('UserTasks').onSnapshot((querySnapshot) => {
      const userTasks = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().taskId === id) {
          db.collection('UserTasks')
            .doc(doc.data().id)
            .delete();
        }
        userTasks.push(doc.data());
      });
      this.setState({
        userTasks,
      });
    });
  };

  handleDelete = (id) => {
    const { tasks } = this.state;

    const db = fire.firestore();
    db.collection('Members')
      .doc(id)
      .delete();

    db.collection('Users')
      .doc(id)
      .delete();

    db.collection('Members').onSnapshot((querySnapshot) => {
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push(doc.data());
      });
      this.setState({
        data: dataArr,
      });
    });

    if (tasks.length) {
      const checkbox = tasks[0].checkboxes.filter((item) => Object.keys(item)[0] !== id);

      db.collection('Tasks').onSnapshot((querySnapshot) => {
        const updateTasks = [];
        querySnapshot.forEach((doc) => {
          updateTasks.push({ ...doc.data(), checkboxes: checkbox });
          db.collection('Tasks')
            .doc(doc.id)
            .update({
              ...doc.data(),
              checkboxes: checkbox,
            });
        });
        this.setState({
          tasks: updateTasks,
        });
      });
    }
  };

  render() {
    const { data, tasks, userTasks, isFetching } = this.state;
    const { isDark, role } = this.props;
    return (
      <div className='content'>
        <Switch>
          {role === 'admin' && isFetching ? (
            <Spinner />
          ) : (
            <>
              <Route exact path='/' component={About} />

              <Route path='/users' exact>
                <Users data={data} handleDelete={this.handleDelete} handleEdit={this.handleEdit} role={role} />
              </Route>

              <Route path='/users/:id/tasks'>
                <UserTasks tasks={tasks} data={data} failStatus={this.failStatus} successStatus={this.successStatus} />
              </Route>

              <Route path='/users/:id/progress'>
                <UserProgress data={data} tasks={tasks} />
              </Route>

              <Route path='/new-user'>
                <NewUser transferData={this.transferData} isDark={isDark} tasks={tasks} />
              </Route>

              <Route path='/tasks'>
                <Tasks
                  tasks={tasks}
                  handleDelete={this.handleDeleteTask}
                  handleEditTask={this.handleEditTask}
                  data={data}
                  isDark={isDark}
                  transferUserTasks={this.transferUserTasks}
                />
              </Route>

              <Route path='/new-task'>
                <NewTask
                  data={data}
                  isDark={isDark}
                  transferTask={this.transferTask}
                  transferUserTasks={this.transferUserTasks}
                />
              </Route>
            </>
          )}
          {role === 'mentor' && isFetching ? (
            <Spinner />
          ) : (
            <>
              <Route exact path='/' component={About} />

              <Route path='/users' exact>
                <Users data={data} handleDelete={this.handleDelete} handleEdit={this.handleEdit} role={role} />
              </Route>

              <Route path='/users/:id/tasks'>
                <UserTasks tasks={tasks} data={data} failStatus={this.failStatus} successStatus={this.successStatus} />
              </Route>

              <Route path='/users/:id/progress'>
                <UserProgress data={data} tasks={tasks} />
              </Route>

              <Route path='/tasks'>
                <Tasks
                  tasks={tasks}
                  handleDelete={this.handleDeleteTask}
                  handleEditTask={this.handleEditTask}
                  data={data}
                  isDark={isDark}
                  userTasks={userTasks}
                />
              </Route>

              <Route path='/new-task'>
                <NewTask
                  data={data}
                  isDark={isDark}
                  transferTask={this.transferTask}
                  transferUserTasks={this.transferUserTasks}
                />
              </Route>
            </>
          )}
          {role === 'user' && isFetching ? (
            <Spinner />
          ) : (
            <>
              <Route exact path='/' component={About} />

              <Route path='/users/:id/tasks'>
                <UserTasks tasks={tasks} data={data} role={role} />
              </Route>

              <Route path='/tracking'>
                <Tracks tasks={tasks} />
              </Route>
            </>
          )}
          <Route path='*'>
            <Error role={role} />
          </Route>
        </Switch>
      </div>
    );
  }
}
