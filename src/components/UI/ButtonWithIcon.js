import React from 'react';

export default function ButtonWithIcon(props) {
  return (
    <button className={props.className} onClick={props.showModal}>
      {props.children}
    </button>
  );
}
