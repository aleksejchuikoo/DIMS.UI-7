import React, { Component } from 'react';
import '../Header/Modal/Modal.sass';
import Button from '../UI/Button';
import fire from '../../config/Fire';

export default class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fireErrors: '',
      formTitle: 'Login',
      loginBtn: true,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  login = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { characterRole } = this.props;
    const db = fire.firestore();

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.setState({
          fireErrors: error.message,
        });
      });

    if (email === 'admin@gmail.com') {
      characterRole('admin');
    } else {
      db.collection('Users').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().email === email && doc.data().password === password) {
            console.log('role', doc.data().role);
            characterRole(doc.data().role);
          }
        });
      });
    }
  };

  register = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        this.setState({
          fireErrors: error.message,
        });
      });
  };

  getAction = (action) => {
    if (action === 'reg') {
      this.setState({
        formTitle: 'Register New User',
        loginBtn: false,
        fireErrors: '',
      });
    } else {
      this.setState({
        formTitle: 'Login',
        loginBtn: true,
        fireErrors: '',
      });
    }
  };

  render() {
    const { email, password, fireErrors, formTitle, loginBtn } = this.state;

    const errorNotification = fireErrors ? <div className='error'>{fireErrors}</div> : null;

    const submitBtn = loginBtn ? (
      <Button action='create' type='submit' handleButton={this.login}>
        Enter
      </Button>
    ) : (
      <Button action='edit' type='submit' handleButton={this.register}>
        Register
      </Button>
    );

    const loginRegister = loginBtn ? (
      <Button action='edit' handleButton={() => this.getAction('reg')}>
        Register
      </Button>
    ) : (
      <Button action='create' handleButton={() => this.getAction('login')}>
        Login
      </Button>
    );

    return (
      <div className='form__block'>
        <div className='headerModal headerModal__form'>
          <div className='headerModal__header'>
            <div id='title' className='headerModal__header-title'>
              {formTitle}
            </div>
          </div>
          <div className='headerModal__body'>
            <form>
              <div className='form__box'>
                {errorNotification}
                <input type='text' value={email} onChange={this.handleChange} name='email' placeholder='Email' />
                <input
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                  name='password'
                  placeholder='Password'
                />
              </div>
              <div className='btn-actions'>{submitBtn}</div>
            </form>
            <div className='btn-actions'>{loginRegister}</div>
          </div>
        </div>
      </div>
    );
  }
}
