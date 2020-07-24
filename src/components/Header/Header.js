import React from 'react';
import './Header.sass';
import HeaderNavLink from './HeaderNavLink';
import ButtonWithIcon from '../UI/ButtonWithIcon';

export default function Header(props) {
  const { showModal, formName, role, idUser } = props;

  return (
    <div className='header'>
      {role === 'admin' && (
        <>
          <div className='role'>{role}</div>
          <ul className='nav'>
            <li className='nav__item'>
              <HeaderNavLink to='/users'>Members</HeaderNavLink>
            </li>
            <li className='nav__item'>
              <HeaderNavLink to='/new-user'>New member</HeaderNavLink>
            </li>
            <li className='nav__item'>
              <HeaderNavLink to='/tasks'>Tasks</HeaderNavLink>
            </li>
            <li className='nav__item'>
              <HeaderNavLink to='/new-task'>New task</HeaderNavLink>
            </li>
          </ul>
        </>
      )}
      {role === 'mentor' && (
        <>
          <div className='role'>{role}</div>
          <ul className='nav'>
            <li className='nav__item'>
              <HeaderNavLink to='/users'>Members</HeaderNavLink>
            </li>
            <li className='nav__item'>
              <HeaderNavLink to='/tasks'>Tasks</HeaderNavLink>
            </li>
            <li className='nav__item'>
              <HeaderNavLink to='/new-task'>New task</HeaderNavLink>
            </li>
          </ul>
        </>
      )}
      {role === 'user' && (
        <>
          <div className='role'>{role}</div>
          <ul className='nav'>
            <li className='nav__item'>
              <HeaderNavLink to={`/users/${idUser}/tasks}`}>My Tasks</HeaderNavLink>
            </li>
            <li className='nav__item'>
              <HeaderNavLink to='/new-task'>Tracking</HeaderNavLink>
            </li>
          </ul>
        </>
      )}
      {role === '' && (
        <>
          <div className='role'>{formName}</div>
        </>
      )}
      <div>
        <ButtonWithIcon className='settings' showModal={showModal}>
          <i className='fa fa-cogs' />
        </ButtonWithIcon>
      </div>
    </div>
  );
}
