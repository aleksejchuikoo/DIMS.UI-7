import React from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderNavLink(props) {
  return (
    <NavLink to={props.to} className='nav__link' activeClassName='nav__link-active'>
      {props.children}
    </NavLink>
  );
}
