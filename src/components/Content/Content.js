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
      data: [],
    };
  }

  transferData = (data) => {
    this.setState({
      data: [...this.state.data, { ...data }],
    });

    console.log(this.state.data);
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
          sex: 'Male',
          university: '8.0',
          email: 'aleksej.chuyko@gmail.com',
          skype: 'Aleksej Chuiko',
          phone: '80295719375',
        },
      ],
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className='content'>
        <Route path='/users' exact>
          <Users data={data} />
        </Route>

        <Route path='/new-user'>
          <NewUser transferData={this.transferData} />
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
