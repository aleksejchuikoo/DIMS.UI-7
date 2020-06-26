import React from 'react';
import './Header.sass';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  return (
    <div className='header'>
      <div className='role'>Admin</div>
      <ul className='nav'>
        <li className='nav__item'>
          <NavLink to='/users' className='nav__link' activeClassName='nav__link-active'>
            Members
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/new-user' className='nav__link' activeClassName='nav__link-active'>
            New member
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/tasks' className='nav__link' activeClassName='nav__link-active'>
            Tasks
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink to='/new-task' className='nav__link' activeClassName='nav__link-active'>
            New task
          </NavLink>
        </li>
      </ul>
      <div>
        <button className='settings' onClick={props.showModal}>
          <i className='fa fa-cogs'></i>
        </button>
      </div>
    </div>
  );
}
