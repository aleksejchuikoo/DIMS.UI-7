import React, { Component } from 'react';
import './NewUser.sass';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from '../../UI/Dropdown';
import Date from '../../UI/Date';
import RadioButtons from '../../UI/RadioButtons';
import Button from '../../UI/Button';
import fire from '../../../config/Fire';
import ModalError from '../ModalError/ModalError';

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

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,3})*$/);

export default class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      startDate: '',
      mathScore: '',
      education: '',
      direction: '',
      address: '',
      birthday: '',
      sex: '',
      university: '',
      email: '',
      skype: '',
      phone: '+_ (___) ___-__-__',
      isActive: false,
      id: uuidv4(),
      error: '',
      errorInput: '',
      role: 'user',
    };
  }

  emailValidator = (e) => {
    const val = e.target.value;

    if (val.match(emailRegex)) {
      console.log('true');
      this.setState({
        email: val,
        errorInput: '',
      });
    } else {
      console.log('false');
      this.setState({
        email: val,
        errorInput: false,
      });
    }
  };

  /* ------------------------Phone number validation------------------------ */

  handlePointer = (e) => {
    const { selectionStart } = e.target;
    const currPos = selectionStart;

    if (currPos !== 1) {
      e.target.setSelectionRange(1, 1);
    }
  };

  setPointer = (e) => {
    const { selectionStart, name, value } = e.target;
    const { phone } = this.state;

    if (e.keyCode >= 48 && e.keyCode <= 57) {
      console.log(value);
      e.preventDefault();

      const currPos = selectionStart;
      const nextSymb = phone.indexOf('_', currPos + 1);

      let pos = nextSymb;
      if (pos === -1) {
        pos = 1;
      }

      e.target.setSelectionRange(pos, pos);
    }
  };

  /* ------------------------Phone number validation------------------------ */

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { errorInput } = this.state;
    let userInfo = { ...data, isActive: true };
    userInfo = Object.values(userInfo).every((val) => !!val);

    if (userInfo) {
      const db = fire.firestore();
      db.collection('Data')
        .doc(data.id)
        .set({
          ...data,
        })
        .catch((err) => {
          console.log('Error ', err.message);
        });

      this.setState({
        firstName: '',
        lastName: '',
        startDate: '',
        mathScore: '',
        education: '',
        direction: '',
        address: '',
        birthday: '',
        sex: '',
        university: '',
        email: '',
        skype: '',
        phone: '',
        isActive: false,
        id: uuidv4(),
        error: '',
        errorInput: '',
      });
    } else if (errorInput === false) {
      this.setState({
        errorInput: true,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  handleInputChange = (e) => {
    const { value, name } = e.target;
    if ((name === 'firstName' || name === 'lastName') && value.length >= 31) {
      this.setState({
        errorInput: false,
      });
    } else {
      this.setState({
        [name]: value,
        errorInput: '',
      });
    }
  };

  handleRange = (e) => {
    const { name, max, value } = e.target;
    const regExp = /[0-9]/g;

    if (value === '-' || value === '+') {
      return;
    }
    if ((regExp.test(value) || value === '') && +value < +max + 1) {
      this.setState({
        [name]: value,
      });
    }
  };

  handleComponent = (val, name) => {
    this.setState({
      [name]: val,
    });
  };

  isError = () => {
    const { error, errorInput } = this.state;
    if (error && errorInput) {
      this.setState({
        error: '',
        errorInput: '',
      });
    } else if (error) {
      this.setState({
        error: '',
      });
    } else {
      this.setState({
        errorInput: '',
      });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      mathScore,
      education,
      direction,
      address,
      sex,
      birthday,
      startDate,
      university,
      email,
      skype,
      phone,
      error,
      errorInput,
    } = this.state;

    const { isDark } = this.props;

    return (
      <>
        <div className='newUser'>
          <div className='newUser__form_icon'>
            <i className='fa fa-user-plus' />
          </div>
          <form className='newUser__form' onSubmit={this.handleSubmit}>
            <h1 className='newUser__form_title'>Create new user</h1>
            <div className='newUser__form_wrapper'>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_row'>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    value={firstName}
                    onChange={this.handleInputChange}
                  />
                  <span
                    className='newUser__form_row-error'
                    style={firstName.length >= 30 ? { visibility: 'visible' } : { visibility: 'hidden' }}
                  >
                    Max: 30 symbols
                  </span>
                </div>
                <div className='newUser__form_row'>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    value={lastName}
                    onChange={this.handleInputChange}
                  />
                  <span
                    className='newUser__form_row-error'
                    style={lastName.length >= 30 ? { visibility: 'visible' } : { visibility: 'hidden' }}
                  >
                    Max: 30 symbols
                  </span>
                </div>
              </div>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_row'>
                  <div className='newUser__form_wrapper-label'>
                    <label>Start Date:</label>
                  </div>
                  <div className='newUser__form_wrapper-input'>
                    <Date
                      placeholder='DD/MM/YYYY'
                      name='startDate'
                      value={startDate}
                      changeDate={this.handleComponent}
                    />
                  </div>
                </div>
                <span className='newUser__form_row-error'>Error</span>
                <div className='newUser__form_row'>
                  <div className='newUser__form_wrapper-label'>
                    <label>CT Math Score:</label>
                  </div>
                  <div className='newUser__form_wrapper-input'>
                    <input
                      type='text'
                      placeholder='0'
                      max='100'
                      name='mathScore'
                      value={mathScore}
                      onChange={this.handleRange}
                      autoComplete='off'
                    />
                  </div>
                </div>
                <span className='newUser__form_row-error'>Error</span>
              </div>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_row'>
                  <input
                    type='text'
                    name='education'
                    placeholder='Education'
                    value={education}
                    onChange={this.handleInputChange}
                  />
                  <span className='newUser__form_row-error'>Error</span>
                </div>
                <div className='newUser__form_row'>
                  <Dropdown
                    title='Direction'
                    items={items}
                    value={direction}
                    name='direction'
                    handlerDropdown={this.handleComponent}
                  />
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
                  <input type='text' name='address' value={address} onChange={this.handleInputChange} />
                </div>
                <span className='newUser__form_row-error'>Error</span>
              </div>
            </div>
            <div className='newUser__form_wrapper'>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-label'>
                  <label>Birth date:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <Date placeholder='DD/MM/YYYY' name='birthday' changeDate={this.handleComponent} value={birthday} />
                </div>
              </div>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-label'>
                  <label>Sex:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <RadioButtons name='sex' value={sex} changeRadio={this.handleComponent} />
                </div>
              </div>
              <div className='newUser__form_wrapper-inner wrapper-inner-score'>
                <div className='newUser__form_wrapper-label'>
                  <label>University average score:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <input
                    type='text'
                    max='10'
                    placeholder='0'
                    name='university'
                    value={university}
                    onChange={this.handleRange}
                    autoComplete='off'
                  />
                </div>
              </div>
            </div>
            <div className='newUser__form_wrapper contacts'>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-label'>
                  <label>Email:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.emailValidator}
                    style={!email.match(emailRegex) && email.length > 0 ? { border: '1px solid red' } : null}
                  />
                </div>
              </div>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-label'>
                  <label>Skype:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <input type='text' name='skype' value={skype} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-label'>
                  <label>Phone:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <input
                    type='text'
                    name='phone'
                    value={phone}
                    onChange={this.setPointer}
                    onClick={this.handlePointer}
                    onKeyDown={this.setPointer}
                  />
                </div>
              </div>
            </div>

            <div className='newUser__form-btn'>
              <Button action='create'>Create</Button>
            </div>
          </form>
        </div>
        <ModalError error={error} errorInput={errorInput} handleButton={this.isError} isDark={isDark} />
      </>
    );
  }
}
