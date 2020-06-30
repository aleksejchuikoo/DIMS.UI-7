import React, { useState } from 'react';
import './Dropdown.sass';

export default function Dropdown({ title, items = [], handlerDropdown, name, value }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(value);

  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    setOpen(!open);
    setSelection(item.value);

    handlerDropdown(item.value, name);
  }

  return (
    <div className='dd-wrapper'>
      <div className='dd-header' role='button' onClick={toggle}>
        <div className={`dd-header__title ${selection ? 'active' : ''}`}>{selection ? selection : title}</div>
        <div className={`dd-header__action ${open ? 'open' : ''}`}></div>
      </div>
      {open && (
        <ul className='dd-list'>
          {items.map((item) => (
            <li className='dd-list__item' key={item.id}>
              <button type='button' name='direction' onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
