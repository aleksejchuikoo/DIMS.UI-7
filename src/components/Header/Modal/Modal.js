import React, { Component } from 'react';
import { CrossButton, Button } from '../../UI/Buttons';
import './Modal.sass';

export default class HeaderModal extends Component {
  render() {
    return (
      <div className='headerModalOverlay'>
        <div className='headerModal'>
          <div className='headerModal__header'>
            <div className='headerModal__header-title'>Settings</div>
            <div className='headerModal__header-close'>
              <CrossButton>&times;</CrossButton>
            </div>
          </div>
          <div className='headerModal__body'></div>
          <div className='headerModal__footer'>
            <Button action='leave'>Log out</Button>
          </div>
        </div>
      </div>
    );
  }
}
