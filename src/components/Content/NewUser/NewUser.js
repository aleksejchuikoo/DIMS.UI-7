import React, { Component } from 'react';
import './NewUser.sass';
import { Button } from '../../UI/Buttons';

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form className='newUser__form' noValidate>
        <div className='newUser__form_wrapper'>
          <div className='newUser__form_wrapper-inner'>
            <div className='newUser__form_row'>
              <input type='text' className='' name='firstname' noValidate />
            </div>
            <div className='newUser__form_row'>
              <input type='text' className='' name='lastname' noValidate />
            </div>
            <div className='newUser__form_row'>
              <label>Sex:</label>
            </div>
            <div className='newUser__form_row'>
              <label htmlFor=''>Birth date:</label>
              <input type='text' className='' name='' noValidate />
            </div>
            <div className='newUser__form_row'>
              <input type='text' className='' name='education' noValidate />
            </div>
            <div className='newUser__form_row'>
              <label htmlFor='average-score'>University average score:</label>
              <input type='text' className='' name='average-score' noValidate />
            </div>
          </div>
          <div className='newUser__form_wrapper-inner'>
            <div className='newUser__form_row'>
              <input type='text' className='' name='firstname' noValidate />
            </div>
            <div className='newUser__form_row'>
              <input type='text' className='' name='lastname' noValidate />
            </div>
            <div className='newUser__form_row'></div>
            <div className='newUser__form_row'>
              <input type='text' className='' name='' noValidate />
            </div>
            <div className='newUser__form_row'>
              <input type='text' className='' name='education' noValidate />
            </div>
            <div className='newUser__form_row'>
              <label htmlFor='average-score'>Math score:</label>
              <input type='text' className='' name='average-score' noValidate />
            </div>
          </div>
        </div>
        <div className='addres'>
          <input type='text' />
        </div>
        <div className='newUser__form-btn'>
          <Button action='create'>Create</Button>
        </div>
      </form>
    );
  }
}
