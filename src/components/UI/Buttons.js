import React from 'react';
import './Buttons.sass';

export function CrossButton(props) {
  return (
    <button className='btn btn-cross' onClick={props.handleButton}>
      {props.children}
    </button>
  );
}

export function Button(props) {
  return (
    <button className={props.action ? `btn btn-${props.action}` : 'btn'} onClick={props.handleButton}>
      {props.children}
    </button>
  );
}

export function CheckboxButton(props) {
  return (
    <div className={`theme-switcher-label ${props.isActive ? 'active' : ''}`} onClick={props.handleChechbox}>
      <div className='switch-path'>
        <div className='switch-handle'></div>
      </div>
    </div>
  );
}
