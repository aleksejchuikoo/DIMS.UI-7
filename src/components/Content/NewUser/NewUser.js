import React, { Component } from 'react';
import './NewUser.sass';
import Dropdown from '../../UI/Dropdown';
import Date from '../../UI/Date';
import { v4 as uuidv4 } from 'uuid';
import RadioButtons from '../../UI/RadioButtons';
import Button from '../../UI/Button';

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
      id: uuidv4(),
      error: false,
    };
  }

  emailValidator = (e) => {
    let val = e.target.value;

    this.setState({
      email: val,
    });
    console.log(e.target.value, e.target.name);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;

    this.props.transferData(data);

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
      id: uuidv4(),
      error: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleComponent = (val, name) => {
    this.setState({
      [name]: val,
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
      university,
      email,
      skype,
      phone,
    } = this.state;

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
                <input
                  type='text'
                  name='firstName'
                  placeholder='First name'
                  value={firstName}
                  onChange={this.handleInputChange}
                />
                <span className='newUser__form_row-error'>Max: 20 symbols</span>
              </div>
              <div className='newUser__form_row'>
                <input
                  type='text'
                  name='lastName'
                  placeholder='Last name'
                  value={lastName}
                  onChange={this.handleInputChange}
                />
                <span className='newUser__form_row-error'>Max: 20 symbols</span>
              </div>
            </div>
            <div className='newUser__form_wrapper-inner'>
              <div className='newUser__form_row'>
                <div className='newUser__form_wrapper-label'>
                  <label>Start Date:</label>
                </div>
                <div className='newUser__form_wrapper-input'>
                  <Date placeholder='DD/MM/YYYY' name='startDate' changeDate={this.handleComponent} />
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
                <Date placeholder='DD/MM/YYYY' name='birthday' changeDate={this.handleComponent} />
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
    );
  }
}
