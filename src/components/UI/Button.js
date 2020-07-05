import React from 'react';
import './Buttons.sass';

export default function Button(props) {
  const { action, handleButton, type, children } = props;
  return (
    <button
      className={action ? `btn btn-${action}` : 'btn'}
      onClick={handleButton}
      type={`${type === 'submit'}` ? 'submit' : ''}
    >
      {children}
    </button>
  );
}
