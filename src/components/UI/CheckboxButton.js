import React from 'react';
import './Buttons.sass';

export default function CheckboxButton(props) {
  const { isActive, fullName, handleCheckbox, id, number } = props;
  return (
    <div className={`theme-switcher-label ${isActive ? 'active' : ''}`} onClick={() => handleCheckbox(id, number)}>
      <div className='switch-path'>
        <div className='switch-handle'></div>
      </div>
      <span className='theme-switcher-fullName' style={fullName ? { display: 'inline' } : { display: 'none' }}>
        {fullName ? fullName : ''}
      </span>
    </div>
  );
}
