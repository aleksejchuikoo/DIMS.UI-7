import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Back() {
  return (
    <NavLink to='/users' className='back'>
      <i className='fa fa-arrow-left'></i>
    </NavLink>
  );
}
