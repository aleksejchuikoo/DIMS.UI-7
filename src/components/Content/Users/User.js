import React from 'react';
import './Users.sass';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import ModalUser from './ModalUser';
import ModalUserEdit from './ModalUserEdit';

export default function User({ dataUser, hash, handleDelete, handleEdit }) {
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
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let dayOfBirthday = date.split('/');

    dayOfBirthday = `${dayOfBirthday[2]}-${dayOfBirthday[1]}-${dayOfBirthday[0]}`;
    dayOfBirthday = new Date(Date.parse(dayOfBirthday));

    const dayOfBirthdayNow = new Date(today.getFullYear(), dayOfBirthday.getMonth(), dayOfBirthday.getDate());

    let age = today.getFullYear() - dayOfBirthday.getFullYear();

    if (today < dayOfBirthdayNow) {
      age -= 1;
    }

    return age;
  };

  const { firstName, lastName, direction, education, startDate, birthday, id } = dataUser;

  return (
    <>
      <div className='users__wrapper'>
        <div className='users__wrapper_item' style={{ fontWeight: 'bold' }}>
          {hash}
        </div>
        <div className='users__wrapper_item'>
          <button type='button' onClick={showModal} className='userInfo'>
            {`${firstName} ${lastName}`}
          </button>
        </div>
        <div className='users__wrapper_item'>{direction}</div>
        <div className='users__wrapper_item'>{education}</div>
        <div className='users__wrapper_item'>{startDate}</div>
        <div className='users__wrapper_item'>{parseDate(birthday)}</div>
        <div className='users__wrapper_item'>
          <div className='users__wrapper_column'>
            <div className='users__wrapper_row'>
              <Link to={`/users/${id}/tasks`}>
                <Button action='showTasks'>Tasks</Button>
              </Link>

              <Link to={`/users/${id}/progress`}>
                <Button action='showProgress'>Progress</Button>
              </Link>
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
