import React from 'react';
import CrossButton from '../../UI/CrossButton';
import Button from '../../UI/Button';
import CheckboxButton from '../../UI/CheckboxButton';
import './Modal.sass';
import fire from '../../../config/Fire';

export default function HeaderModal(props) {
  const { handleButton, handleCheckbox, isDark, isOpen, fromRegistry } = props;

  function logout() {
    fire.auth().signOut();
    handleButton();
  }

  return (
    <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
      <div className={`headerModal ${isDark ? 'theme-dark' : ''}`}>
        <div className='headerModal__header'>
          <div className='headerModal__header-title'>Settings</div>
          <div className='headerModal__header-close'>
            <CrossButton handleButton={handleButton}>&times;</CrossButton>
          </div>
        </div>
        <div className='headerModal__body'>
          <span>Dark theme</span>
          <CheckboxButton isActive={isDark} handleCheckbox={handleCheckbox} />
        </div>
        {fromRegistry ? null : (
          <div className='headerModal__footer'>
            <Button action='leave' handleButton={logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
