import React from 'react';
import './Error.scss';
import { NavLink } from 'react-router-dom';

export default function Error() {
  return (
    <div className='text-error'>
      <span>404</span>
      <NavLink to='/users'>Back to Members</NavLink>
    </div>
  );
}
