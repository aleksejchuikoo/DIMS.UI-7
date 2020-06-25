import React from 'react';
import './Buttons.sass';

export function CrossButton(props) {
  return <button className='btn btn-cross'>{props.children}</button>;
}

export function Button(props) {
  return <button className={props.action ? `btn btn-${props.action}` : 'btn'}>{props.children}</button>;
}
