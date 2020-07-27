import React, { Component } from 'react';
import '../NewUser/NewUser.sass';
import '../../Header/Modal/Modal.sass';
import Dropdown from '../../UI/Dropdown';
import Date from '../../UI/Date';
import RadioButtons from '../../UI/RadioButtons';
import Button from '../../UI/Button';
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

export default class ModalUserEdit extends Component {
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
      errorInput: '',
      error: '',
    };
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.dataUser.firstName,
      lastName: this.props.dataUser.lastName,
      startDate: this.props.dataUser.startDate,
      mathScore: this.props.dataUser.mathScore,
      education: this.props.dataUser.education,
      direction: this.props.dataUser.direction,
      address: this.props.dataUser.address,
      birthday: this.props.dataUser.birthday,
      sex: this.props.dataUser.sex,
      error: '',
      errorInput: '',
      university: this.props.dataUser.university,
      email: this.props.dataUser.email,
      skype: this.props.dataUser.skype,
      phone: this.props.dataUser.phone,
    });
  }

  emailValidator = (e) => {
    let val = e.target.value;

    this.setState({
      email: val,
    });
  };

  /* ------------------------Phone number validation------------------------ */

  handlePointer = (e) => {
    const { selectionStart } = e.target;
    const currPos = selectionStart;

    if (currPos !== 1) {
      e.target.setSelectionRange(1, 1);
    }
  };

  handlerPhone = (e) => {
    const { selectionStart, name, value } = e.target;
    const { phone } = this.state;

    const currPos = selectionStart;
    const nextSymb = phone.indexOf('_', currPos + 1);

    let pos = nextSymb;
    if (pos === -1) {
      pos = 1;
    }

    this.setState({
      [name]: value.replace(value[currPos], ''),
    });
    e.target.setSelectionRange(pos, pos);
  };

  setPointer = (e) => {
    if (e.keyCode < 48 || e.keyCode > 57) {
      e.preventDefault();
    }
  };

  /* ------------------------Phone number validation------------------------ */

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { handleEdit, handleButton } = this.props;
    const { errorInput, error } = this.state;

    const filterData = Object.fromEntries(
      Object.entries(data).filter((item) => item[0] !== 'error' && item[0] !== 'errorInput'),
    );

    let userInfo = { ...filterData, isActive: true };
    userInfo = Object.values(userInfo).every((val) => !!val);

    if (userInfo && error === '' && errorInput === '') {
      handleEdit(data, this.props.dataUser.id);
    } else if (errorInput === false) {
      this.setState({
        errorInput: true,
      });
    } else {
      this.setState({
        error: true,
      });
    }

    handleButton(e);
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
      startDate,
      address,
      sex,
      birthday,
      university,
      email,
      skype,
      phone,
      error,
      errorInput,
    } = this.state;

    const { isOpen, handleButton, dataUser, isDark } = this.props;

    return (
      <>
        <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
          <div className='newUser'>
            <form className='newUser__form' onSubmit={this.handleSubmit}>
              <h1 className='newUser__form_title'>
                <i className='fa fa-edit' />
                Edit User
              </h1>
              <div className='newUser__form_wrapper'>
                <div className='newUser__form_wrapper-inner'>
                  <div className='newUser__form_row'>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First name'
                      value={firstName ? firstName : dataUser.firstName}
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
                      value={lastName ? lastName : dataUser.lastName}
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
                        changeDate={this.handleComponent}
                        value={startDate ? startDate : dataUser.startDate}
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
                        max='100'
                        placeholder='0'
                        name='mathScore'
                        value={mathScore ? mathScore : dataUser.mathScore}
                        onChange={this.handleInputChange}
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
                      value={education ? education : dataUser.education}
                      onChange={this.handleInputChange}
                    />
                    <span className='newUser__form_row-error'>Error</span>
                  </div>
                  <div className='newUser__form_row'>
                    <Dropdown
                      title='Direction'
                      items={items}
                      value={direction ? direction : dataUser.direction}
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
                    <input
                      type='text'
                      name='address'
                      value={address ? address : dataUser.address}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className='newUser__form_wrapper'>
                <div className='newUser__form_wrapper-inner'>
                  <div className='newUser__form_wrapper-label'>
                    <label>Birth date:</label>
                  </div>
                  <div className='newUser__form_wrapper-input'>
                    <Date
                      placeholder='DD/MM/YYYY'
                      name='birthday'
                      changeDate={this.handleComponent}
                      value={birthday ? birthday : dataUser.birthday}
                    />
                  </div>
                </div>
                <div className='newUser__form_wrapper-inner'>
                  <div className='newUser__form_wrapper-label'>
                    <label>Sex:</label>
                  </div>
                  <div className='newUser__form_wrapper-input'>
                    <RadioButtons
                      name='sex'
                      value={sex ? sex.toLowerCase() : dataUser.sex.toLowerCase()}
                      changeRadio={this.handleComponent}
                    />
                  </div>
                </div>
                <div className='newUser__form_wrapper-inner'>
                  <label>University average score:</label>
                  <input
                    type='number'
                    max='10'
                    placeholder='0'
                    name='university'
                    value={university ? university : dataUser.university}
                    onChange={this.handleInputChange}
                    autoComplete='off'
                  />
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
                      value={email ? email : dataUser.email}
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
                    <input
                      type='text'
                      name='skype'
                      value={skype ? skype : dataUser.skype}
                      onChange={this.handleInputChange}
                    />
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
                      value={phone ? phone : dataUser.phone}
                      onClick={this.handlePointer}
                      onKeyDown={this.setPointer}
                      onChange={this.handlerPhone}
                    />
                  </div>
                </div>
              </div>

              <div className='newUser__form-btns'>
                <div className='newUser__form-btn'>
                  <Button action='close' handleButton={handleButton}>
                    Cancel
                  </Button>
                </div>
                <div className='newUser__form-btn'>
                  <Button action='create' type='submit'>
                    Edit
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ModalError error={error} errorInput={errorInput} handleButton={this.isError} isDark={isDark} />
      </>
    );
  }
}
