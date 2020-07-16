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
      phone: '',
      isActive: false,
      id: uuidv4(),
      error: '',
      role: 'user',
    };
  }

  emailValidator = (e) => {
    const val = e.target.value;

    this.setState({
      email: val,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
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
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  handleInputChange = (e) => {
    const { value, name } = e.target;
    if ((name === 'firstName' || name === 'lastName') && value.length > 20) {
      this.setState({
        [name]: value,
        error: false,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleRange = (e) => {
    const { name, max, value } = e.target;
    const regExp = /[0-9]/g;

    if (value === '-' || value === '+') {
      return;
    }

    if ((regExp.test(value) || value === '') && value <= max && value.length <= max.length) {
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
    const { error } = this.state;
    this.setState({
      error: !error,
    });
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
                    style={firstName.length > 20 ? { visibility: 'visible' } : { visibility: 'hidden' }}
                  >
                    Max: 20 symbols
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
                    style={lastName.length > 20 ? { visibility: 'visible' } : { visibility: 'hidden' }}
                  >
                    Max: 20 symbols
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
                      type='number'
                      min='0'
                      max='100'
                      step='1'
                      placeholder='0'
                      name='mathScore'
                      value={mathScore}
                      onChange={this.handleInputChange}
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
              <div className='newUser__form_wrapper-inner'>
                <label>University average score:</label>
                <input
                  type='number'
                  min='0'
                  max='10'
                  step='0.1'
                  placeholder='0'
                  name='university'
                  value={university}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className='newUser__form_wrapper contacts'>
              <div className='newUser__form_wrapper-inner'>
                <div className='newUser__form_wrapper-label'>
                  <label>Email:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <input type='email' name='email' value={email} onChange={this.emailValidator} />
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
                  <input type='text' name='phone' value={phone} onChange={this.handleInputChange} />
                </div>
              </div>
            </div>

            <div className='newUser__form-btn'>
              <Button action='create'>Create</Button>
            </div>
          </form>
        </div>
        <ModalError error={error} handleButton={this.isError} isDark={isDark} />
      </>
    );
  }
}
