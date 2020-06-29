import React, { Component } from 'react';
import User from './User';
import './Users.sass';

export default class Users extends Component {
  render() {
    const { data } = this.props;
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
          return <User dataUser={item} key={i} id={i + 1} />;
        })}
      </div>
    );
  }
}
