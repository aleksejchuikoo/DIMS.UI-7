import React from 'react';
import './Users.sass';
import { Button } from '../../UI/Buttons';
import ModalUser from './ModalUser';
import { useState } from 'react';
import ModalUserEdit from './ModalUserEdit';

export default function User({ dataUser, hash, handleDelete, handleEdit, handleShowProgress, handleShowTasks }) {
  const [isOpen, openModal] = useState(false);
  const [isOpenEdit, editData] = useState(false);

  const showModal = () => {
    if (isOpen) {
      openModal(false);
    } else {
      openModal(true);
    }
  };

  const showModalEdit = (e) => {
    e.preventDefault();

    if (isOpenEdit) {
      editData(false);
    } else {
      editData(true);
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
          {hash}
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
              <Button action='showTasks' handleButton={handleShowTasks}>
                Tasks
              </Button>
              <Button action='showProgress' handleButton={handleShowProgress}>
                Progress
              </Button>
            </div>
            <div className='users__wrapper_row'>
              <Button action='edit' handleButton={showModalEdit}>
                Edit
              </Button>
              <Button action='delete' handleButton={() => handleDelete(dataUser.id)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalUserEdit dataUser={dataUser} isOpen={isOpenEdit} handleButton={showModalEdit} handleEdit={handleEdit} />
      <ModalUser dataUser={dataUser} isOpen={isOpen} handleButton={showModal} />
    </>
  );
}
