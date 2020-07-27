import React, { Component } from 'react';
import './App.sass';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import HeaderModal from './components/Header/Modal/Modal';
import fire from './config/Fire';
import LoginRegister from './components/LoginRegister/LoginRegister';
import './components/Header/Header.sass';
import Spinner from './components/UI/Spinner';
import Error from './components/Content/404/Error';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
      isOpen: false,
      user: '',
      role: '',
      formName: 'login',
      isFetching: false,
      idUser: '',
    };
  }

  componentDidMount() {
    const currentThemeColor = localStorage.getItem('theme-color');

    if (currentThemeColor === 'theme-dark') {
      this.setState({
        isDark: true,
      });
    } else {
      this.setState({
        isDark: false,
      });
    }

    this.setState({
      isFetching: true,
    });
    this.authListener();
  }

  handleSwitchColor = () => {
    const { isDark } = this.state;
    if (isDark) {
      localStorage.setItem('theme-color', 'theme-light');
      this.setState({
        isDark: false,
      });
    } else {
      localStorage.setItem('theme-color', 'theme-dark');
      this.setState({
        isDark: true,
      });
    }
  };

  showModal = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({
        isOpen: false,
      });
    } else {
      this.setState({
        isOpen: true,
      });
    }
  };

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.email === 'admin@gmail.com') {
          this.setState({
            user,
            role: 'admin',
            isFetching: false,
          });
        } else {
          const db = fire.firestore();
          db.collection('Users').onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().email === user.email) {
                this.setState({
                  user,
                  role: doc.data().role,
                  isFetching: false,
                  idUser: doc.data().id,
                });
              }
            });
          });
        }
      } else {
        this.setState({
          user: '',
          role: '',
          isFetching: false,
        });
      }
    });
  }

  render() {
    const { isOpen, isDark, user, role, formName, isFetching, idUser } = this.state;

    return (
      <BrowserRouter>
        {user ? (
          <>
            {(role === 'admin' || role === 'mentor') && <Redirect from='/login' to='/users' />}
            {role === 'user' && <Redirect from='/login' to={`/users/${idUser}/tasks`} />}
            <div className={`App ${isDark ? 'theme-dark' : ''}`}>
              <Header showModal={this.showModal} role={role} idUser={idUser} />
              <Content isDark={isDark} role={role} idUser={idUser} />
              <Footer />
            </div>
            <HeaderModal
              isOpen={isOpen}
              isDark={isDark}
              handleButton={this.showModal}
              handleCheckbox={this.handleSwitchColor}
              logOut={this.logOut}
            />
          </>
        ) : (
          <>
            {role === '' && <Redirect from='/' to='/login' />}
            <Route path='/login'>
              <div className={`App ${isDark ? 'theme-dark' : ''}`}>
                <Header showModal={this.showModal} formName={formName} role={role} />
                {isFetching ? <Spinner /> : <LoginRegister />}
                <Footer />
              </div>
            </Route>
            <HeaderModal
              isOpen={isOpen}
              isDark={isDark}
              handleButton={this.showModal}
              fromRegistry
              handleCheckbox={this.handleSwitchColor}
            />
          </>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
