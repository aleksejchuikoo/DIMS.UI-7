import React from 'react';
import './Header.sass';
import HeaderNavLink from './HeaderNavLink';
import ButtonWithIcon from '../UI/ButtonWithIcon';

export default function Header(props) {
  return (
    <div className='header'>
      <div className='role'>Admin</div>
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
      <div>
        <ButtonWithIcon className='settings' showModal={props.showModal}>
          <i className='fa fa-cogs'></i>
        </ButtonWithIcon>
      </div>
    </div>
  );
}
