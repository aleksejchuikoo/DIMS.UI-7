import React, { Component } from 'react';
import './App.sass';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import HeaderModal from './components/Header/Modal/Modal';
import fire from './config/Fire';
import LoginRegister from './components/LoginRegister/LoginRegister';
import './components/Header/Header.sass';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
      isOpen: false,
      user: '',
      role: '',
      formName: 'login',
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

  checkRole = (role) => {
    if (role === 'admin') {
      this.setState({
        role: 'admin',
      });
    } else if (role === 'mentor') {
      this.setState({
        role: 'mentor',
      });
    } else {
      this.setState({
        role: 'user',
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
          });
        } else {
          this.setState({
            user,
          });
        }
      } else {
        this.setState({
          user: '',
          role: '',
        });
      }
    });
  }

  render() {
    const { isOpen, isDark, user, role, formName } = this.state;

    return (
      <BrowserRouter>
        {user ? (
          <>
            <div className={`App ${isDark ? 'theme-dark' : ''}`}>
              <Header showModal={this.showModal} role={role} />
              <Content isDark={isDark} role={role} />
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
            <div className={`App ${isDark ? 'theme-dark' : ''}`}>
              <Header showModal={this.showModal} formName={formName} role={role} />
              <LoginRegister characterRole={this.checkRole} />
              <Footer />
            </div>
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
