import React from 'react';
import '../../Header/Modal/Modal.sass';
import { CrossButton } from '../../UI/Buttons';

export default function ModalUser({ isOpen, handleButton, dataUser }) {
  return (
    <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
      <div className='headerModal userModal'>
        <div className='headerModal__header userModal__header'>
          <div className='headerModal__header-title userModal__header-title'>
            <i className='fa fa-info-circle'></i> User information
          </div>
          <div className='headerModal__header-close'>
            <CrossButton handleButton={handleButton}>&times;</CrossButton>
          </div>
        </div>
        <div className='headerModal__wrapper'>
          <div className='headerModal__wrapper-info'>
            <div className='headerModal__wrapper_item'>
              <span>First Name: </span>
              <span className='span-userData'>{dataUser.firstName}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Last Name: </span>
              <span className='span-userData'>{dataUser.lastName}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Start date: </span>
              <span className='span-userData'>{dataUser.startDate}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>CT Math score: </span>
              <span className='span-userData'>{dataUser.mathScore}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Education: </span>
              <span className='span-userData'>{dataUser.education}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Direction: </span>
              <span className='span-userData'>{dataUser.direction}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Address: </span>
              <span className='span-userData'>{dataUser.address}</span>
            </div>
          </div>
          <div className='headerModal__wrapper-info'>
            <div className='headerModal__wrapper_item'>
              <span>Birth date: </span>
              <span className='span-userData'>{dataUser.birthday}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Sex: </span>
              <span className='span-userData'>{dataUser.sex}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>University average score: </span>
              <span className='span-userData'>{dataUser.university}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Email: </span>
              <span className='span-userData'>{dataUser.email}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Skype: </span>
              <span className='span-userData'>{dataUser.skype}</span>
            </div>
            <div className='headerModal__wrapper_item'>
              <span>Phone: </span>
              <span className='span-userData'>{dataUser.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
