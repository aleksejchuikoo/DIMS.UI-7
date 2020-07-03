import React from 'react';
import './Buttons.sass';

export default function CrossButton(props) {
  return (
    <button className='btn btn-cross' onClick={props.handleButton}>
      {props.children}
    </button>
  );
}
