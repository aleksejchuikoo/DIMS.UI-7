import React from 'react';
import './Users.sass';
import { Button } from '../../UI/Buttons';
import ModalUser from './ModalUser';
import { useState } from 'react';

export default function User({ dataUser, id }) {
  const [isOpen, openModal] = useState(false);

  const showModal = () => {
    if (isOpen) {
      openModal(false);
    } else {
      openModal(true);
    }
  };

  const parseDate = (date) => {
    let now = new Date(),
      today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      dayOfBirthday = date.split('/');

    dayOfBirthday = `${dayOfBirthday[2]}-${dayOfBirthday[1]}-${dayOfBirthday[0]}`;
    dayOfBirthday = new Date(Date.parse(dayOfBirthday));

    let dayOfBirthdayNow = new Date(today.getFullYear(), dayOfBirthday.getMonth(), dayOfBirthday.getDate());

    let age = today.getFullYear() - dayOfBirthday.getFullYear();

    if (today < dayOfBirthdayNow) {
      age = age - 1;
    }

    return age;
  };

  return (
    <>
      <div className='users__wrapper'>
        <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
          {id}
        </div>
        <div className='users__wrapper_item'>
          <button onClick={showModal} className='userInfo'>
            {`${dataUser.firstName} ${dataUser.lastName}`}
          </button>
        </div>
        <div className='users__wrapper_item'>{dataUser.direction}</div>
        <div className='users__wrapper_item'>{dataUser.education}</div>
        <div className='users__wrapper_item'>{dataUser.startDate}</div>
        <div className='users__wrapper_item'>{parseDate(dataUser.birthday)}</div>
        <div className='users__wrapper_item'>
          <div className='users__wrapper_column'>
            <div className='users__wrapper_row'>
              <Button action='showProgress'>Progress</Button>
              <Button action='showTasks'>Tasks</Button>
            </div>
            <div className='users__wrapper_row'>
              <Button action='edit'>Edit</Button>
              <Button action='delete'>Delete</Button>
            </div>
          </div>
        </div>
      </div>
      <ModalUser dataUser={dataUser} isOpen={isOpen} handleButton={showModal} />
    </>
  );
}
