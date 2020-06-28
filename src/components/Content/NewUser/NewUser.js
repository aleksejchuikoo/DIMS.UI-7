import React, { Component } from 'react';
import './NewUser.sass';
import { Button, RadioButtons } from '../../UI/Buttons';
import Dropdown from '../../UI/Dropdown';
import Date from '../../UI/Date';

const items = [
  {
    id: 1,
    value: 'Java',
  },
  {
    id: 2,
    value: '.Net',
  },
  {
    id: 3,
    value: 'React',
  },
  {
    id: 4,
    value: 'Angular',
  },
];

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  emailValidator = (e) => {
    let regEx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,8})$/;

    if (regEx.test()) {
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className='newUser'>
        <div className='newUser__form_icon'>
          <i className='fa fa-user-plus'></i>
        </div>
        <form className='newUser__form' onSubmit={this.handleSubmit}>
          <h1 className='newUser__form_title'>Create new user</h1>
          <div className='newUser__form_wrapper'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <input type='text' name='firstname' placeholder='First name' />
                <span className='newUser__form_row-error'>Max: 20 symbols</span>
              </div>
              <div className='newUser__form_row'>
                <input type='text' name='lastname' placeholder='Last name' />
                <span className='newUser__form_row-error'>Max: 20 symbols</span>
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <div className='newUser__form_wrapper-label'>
                  <label>Start Date:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <Date placeholder='DD/MM/YYYY' />
                </div>
              </div>
              <span className='newUser__form_row-error'>Error</span>
              <div className='newUser__form_row'>
                <div className='newUser__form_wrapper-label'>
                  <label>CT Math Score:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <input type='number' min='0' max='100' step='1' name='math-score' placeholder='Math score' />
                </div>
              </div>
              <span className='newUser__form_row-error'>Error</span>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <input type='text' name='education' placeholder='Education' />
                <span className='newUser__form_row-error'>Error</span>
              </div>
              <div className='newUser__form_row'>
                <Dropdown title='Direction' items={items} />
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
                <input type='text' name='address' />
              </div>
            </div>
          </div>
          <div className='newUser__form_wrapper'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Birth date:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <Date placeholder='DD/MM/YYYY' />
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
              <input type='number' min='0' max='10' step='0.1' name='math-score' placeholder='Score' />
            </div>
          </div>
          <div className='newUser__form_wrapper contacts'>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Email:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='text' name='email' onChange={this.emailValidator} />
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Skype:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='skype' name='skype' />
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_wrapper-label'>
                <label>Phone:</label>
              </div>
              <div className='newUser__form_wrapper-input'>
                <input type='skype' name='phone' />
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
