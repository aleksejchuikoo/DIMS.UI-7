import React from 'react';
import './Error.scss';
import { NavLink } from 'react-router-dom';

export default function Error({ role }) {
  return (
    <div className='text-error'>
      <span>404</span>
      {(role === 'admin' || role === 'mentor') && <NavLink to='/tasks'>Back to Members</NavLink>}
      {role === 'user' && <NavLink to='/tasks'>Back to Tasks</NavLink>}
      {role === '' && <NavLink to='/login'>Back to Form</NavLink>}
    </div>
  );
}
