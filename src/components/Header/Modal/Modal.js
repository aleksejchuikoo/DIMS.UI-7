import React, { Component } from 'react';
import { CrossButton, Button, CheckboxButton } from '../../UI/Buttons';
import './Modal.sass';

export default class HeaderModal extends Component {
  render() {
    const { handleButton, handleChechbox, isDark, isOpen } = this.props;

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
            <CheckboxButton isActive={isDark} handleChechbox={handleChechbox} />
          </div>
          <div className='headerModal__footer'>
            <Button action='leave'>Log out</Button>
          </div>
        </div>
      </div>
    );
  }
}
