import React, { Component } from 'react';
import './Content.sass';
import Users from './Users/Users';
import NewUser from './NewUser/NewUser';
import Tasks from './Tasks/Tasks';
import NewTask from './NewTask/NewTask';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserTasks from './Users/UserTasks';
import UserProgress from './Users/Progress/UserProgress';
import Error from './404/Error';
import About from './About/About';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tasks: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  transferData = (data) => {
    this.setState({
      data: [...this.state.data, { ...data }],
    });
  };

  transferTasks = (tasks) => {
    this.setState({
      tasks: [...this.state.tasks, { ...tasks }],
    });
  };

  componentDidMount() {
    this.setState({
      data: [
        {
          firstName: 'Aleksej',
          lastName: 'Chuyko',
          startDate: '29/06/2020',
          mathScore: '81',
          education: 'BSUIR',
          direction: 'React',
          address: 'Minsk region, Ivenec',
          birthday: '13/03/2000',
          sex: 'male',
          university: '8.0',
          email: 'aleksej.chuyko@gmail.com',
          skype: 'Aleksej Chuiko',
          phone: '80295719375',
          isActive: false,
          id: uuidv4(),
        },
        {
          firstName: 'Andrey',
          lastName: 'Chuyko',
          startDate: '30/06/2020',
          mathScore: '65',
          education: 'BNTU',
          direction: 'Angular',
          address: 'Minsk region, Ivenec',
          birthday: '13/07/1996',
          sex: 'male',
          university: '10.0',
          email: 'andrey.chuyko@gmail.com',
          skype: 'Andrey Chuiko',
          phone: '80295719375',
          isActive: false,
          id: uuidv4(),
        },
        {
          firstName: 'Aleksandr',
          lastName: 'Chuyko',
          startDate: '30/06/2020',
          mathScore: '74',
          education: 'BSUIR',
          direction: 'Java',
          address: 'Minsk region, Ivenec',
          birthday: '20/08/1999',
          sex: 'male',
          university: '9.0',
          email: 'aleksandr.chuyko@gmail.com',
          skype: 'Aleksandr Chuiko',
          phone: '80295719375',
          isActive: false,
          id: uuidv4(),
        },
      ],
    });
  }

  handleDelete(id) {
    const { data, tasks } = this.state;

    const indexData = data.findIndex((item) => id === item.id);
    const filteredData = data.filter((item) => id !== item.id);
    const filteredTasks = tasks.map((item) => ({
      ...item,
      checkboxes: item.checkboxes.filter((item, index) => index !== indexData),
    }));

    this.setState({
      data: [...filteredData],
      tasks: [...filteredTasks],
    });
  }

  handleDeleteTask(id) {
    const { tasks } = this.state;

    const filteredTasks = tasks.filter((item) => id !== item.id);

    this.setState({
      tasks: [...filteredTasks],
    });
  }

  handleEdit(editData, idData) {
    const { data } = this.state;
    const selectedItem = data.findIndex((item) => item.id === idData);
    const firstArr = data.slice(0, selectedItem);
    const secondArr = data.slice(selectedItem + 1);

    this.setState({
      data: [...firstArr, editData, ...secondArr],
    });
  }

  handleEditTask(editTask, idTask) {
    const { tasks } = this.state;
    const selectedItem = tasks.findIndex((item) => item.id === idTask);
    const firstArr = tasks.slice(0, selectedItem);
    const secondArr = tasks.slice(selectedItem + 1);

    this.setState({
      tasks: [...firstArr, { ...editTask, id: idTask }, ...secondArr],
    });
  }

  handleCheckbox = (id) => {
    const { data } = this.state;
    const selectedItem = data.findIndex((item) => item.id === id);

    const { isActive } = data[selectedItem];

    const firstArr = data.slice(0, selectedItem);
    const secondArr = data.slice(selectedItem + 1);

    this.setState({
      data: [...firstArr, { ...data[selectedItem], isActive: !isActive }, ...secondArr],
    });
  };

  failStatus = (fail, task, idTask) => {
    const { tasks } = this.state;
    const selectedItem = tasks.findIndex((item) => item.id === idTask);
    const firstArr = tasks.slice(0, selectedItem);
    const secondArr = tasks.slice(selectedItem + 1);

    this.setState({
      tasks: [...firstArr, { ...task, status: 'fail' }, ...secondArr],
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

  render() {
    const { data, tasks } = this.state;
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
            <NewUser transferData={this.transferData} />
          </Route>

          <Route path='/tasks'>
            <Tasks
              tasks={tasks}
              handleDelete={this.handleDeleteTask}
              handleEdit={this.handleEditTask}
              data={data}
              handleCheckbox={this.handleCheckbox}
            />
          </Route>

          <Route path='/new-task'>
            <NewTask transferTasks={this.transferTasks} data={data} handleCheckbox={this.handleCheckbox} />
          </Route>

          <Route path='*' component={Error} />
        </Switch>
      </div>
    );
  }
}
