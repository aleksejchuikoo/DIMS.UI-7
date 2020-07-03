import React from 'react';
import './Buttons.sass';

export default function CheckboxButton(props) {
  return (
    <div className={`theme-switcher-label ${props.isActive ? 'active' : ''}`} onClick={props.handleChechbox}>
      <div className='switch-path'>
        <div className='switch-handle'></div>
      </div>
    </div>
  );
}
