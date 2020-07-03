import React from 'react';
import './Buttons.sass';

export default function Button(props) {
  return (
    <button
      className={props.action ? `btn btn-${props.action}` : 'btn'}
      onClick={props.handleButton}
      type={`${props.type === 'submit'}` ? 'submit' : ''}
    >
      {props.children}
    </button>
  );
}
