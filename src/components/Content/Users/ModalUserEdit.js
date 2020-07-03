import React, { Component } from 'react';
import '../NewUser/NewUser.sass';
import '../../Header/Modal/Modal.sass';
import Dropdown from '../../UI/Dropdown';
import Date from '../../UI/Date';
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
      phone: '',
      error: false,
    };
  }

  UNSAFE_componentWillReceiveProps() {
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
      university: this.props.dataUser.university,
      email: this.props.dataUser.email,
      skype: this.props.dataUser.skype,
      phone: this.props.dataUser.phone,
    });
  }

  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     ...state,
  //     ...props.dataUser
  //   }
  // }

  emailValidator = (e) => {
    let val = e.target.value;

    this.setState({
      email: val,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    const { handleEdit, handleButton } = this.props;

    handleEdit(data, this.props.dataUser.id);
    handleButton(e);
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
      startDate,
      address,
      sex,
      birthday,
      university,
      email,
      skype,
      phone,
    } = this.state;

    const { isOpen, handleButton, dataUser } = this.props;

    return (
      <div className='headerModalOverlay' style={isOpen ? { display: 'flex' } : { display: 'none' }}>
        <div className='newUser'>
          <form className='newUser__form' onSubmit={this.handleSubmit}>
            <h1 className='newUser__form_title'>
              <i className='fa fa-edit'></i> Edit User
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
                  <span className='newUser__form_row-error'>Max: 20 symbols</span>
                </div>
                <div className='newUser__form_row'>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    value={lastName ? lastName : dataUser.lastName}
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
                      type='number'
                      min='0'
                      max='100'
                      step='1'
                      placeholder='0'
                      name='mathScore'
                      value={mathScore ? mathScore : dataUser.mathScore}
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
                  <RadioButtons name='sex' value={sex ? sex : dataUser.sex} changeRadio={this.handleComponent} />
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
                  value={university ? university : dataUser.university}
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
                  <input
                    type='email'
                    name='email'
                    value={email ? email : dataUser.email}
                    onChange={this.emailValidator}
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
                    onChange={this.handleInputChange}
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
    );
  }
}
