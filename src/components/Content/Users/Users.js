import React, { Component } from 'react';
import User from './User';
import './Users.sass';

export default class Users extends Component {
  render() {
    const { data, handleDelete, handleEdit, handleShowProgress, handleShowTasks } = this.props;
    return (
      <div className='users'>
        <div className='users__title'>
          <div className='users__title-name'>#</div>
          <div className='users__title-name'>full name</div>
          <div className='users__title-name'>direction</div>
          <div className='users__title-name'>education</div>
          <div className='users__title-name'>start</div>
          <div className='users__title-name'>age</div>
          <div className='users__title-name'></div>
        </div>
        {data.map((item, i) => {
          return (
            <User
              dataUser={item}
              key={i}
              hash={i + 1}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleShowProgress={handleShowProgress}
              handleShowTasks={handleShowTasks}
            />
          );
        })}
      </div>
    );
  }
}
