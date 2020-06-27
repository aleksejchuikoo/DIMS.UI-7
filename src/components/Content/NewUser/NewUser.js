import React, { Component } from 'react';
import './NewUser.sass';
import { Button, RadioButtons } from '../../UI/Buttons';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='newUser'>
        <div className='newUser__form_icon'>
          <i className='fa fa-user-plus'></i>
        </div>
        <form className='newUser__form' noValidate>
          <h1 className='newUser__form_title'>Create new user</h1>
          <div className='newUser__form_wrapper'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <input type='text' className='' name='firstname' placeholder='First name' noValidate />
                <span className='newUser__form_row-error'>Error</span>
              </div>
              <div className='newUser__form_row'>
                <input type='text' className='' name='lastname' placeholder='Last name' noValidate />
                <span className='newUser__form_row-error'>Error</span>
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <input type='text' className='' name='education' placeholder='Education' noValidate />
                <span className='newUser__form_row-error'>Error</span>
              </div>
              <div className='newUser__form_row'>
                <input type='text' className='' name='math-score' placeholder='Math score' noValidate />
                <span className='newUser__form_row-error'>Error</span>
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <input type='text' className='' name='direction' placeholder='Direction' noValidate />
                <span className='newUser__form_row-error'>Error</span>
              </div>
              <div className='newUser__form_row'>
                <input type='text' className='' name='stard-date' placeholder='Start date' noValidate />
                <span className='newUser__form_row-error'>Error</span>
              </div>
            </div>
          </div>
          <div className='newUser__form_wrapper address'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Address:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='text' className='' name='address' noValidate />
              </div>
            </div>
          </div>
          <div className='newUser__form_wrapper'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Birth date:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='text' className='' name='average-score' noValidate />
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Sex:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <RadioButtons />
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <label>University average score:</label>
              <span className='univerScore'></span>
            </div>
          </div>
          <div className='newUser__form_wrapper contacts'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Email:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='email' className='' name='email' noValidate />
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Skype:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='skype' className='' name='skype' noValidate />
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Phone:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='skype' className='' name='phone' noValidate />
              </div>
            </div>
          </div>

          <div className='newUser__form-btn'>
            <Button action='create'>Create</Button>
          </div>
        </form>
      </div>
    );
  }
}
