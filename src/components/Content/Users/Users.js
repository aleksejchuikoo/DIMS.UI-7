import React from 'react';
import User from './User';
import './Users.sass';

export default function Users(props) {
  const { data, handleDelete, handleEdit } = props;
  return (
    <div className='users users-animation'>
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
        return <User dataUser={item} key={i} hash={i + 1} handleDelete={handleDelete} handleEdit={handleEdit} />;
      })}
    </div>
  );
}
