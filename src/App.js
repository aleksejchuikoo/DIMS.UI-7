import React, { Component } from 'react';
import './App.sass';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import HeaderModal from './components/Header/Modal/Modal';
import fire from './config/Fire';
import LoginRegister from './components/LoginRegister/LoginRegister';
import ButtonWithIcon from './components/UI/ButtonWithIcon';
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
    } else {
      this.setState({
        role: 'user',
      });
    }
  };

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({
          user,
        });
      } else {
        this.setState({
          user: '',
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
              <Content />
              <Footer />
            </div>
            <HeaderModal
              isOpen={isOpen}
              isDark={isDark}
              handleButton={this.showModal}
              handleCheckbox={this.handleSwitchColor}
            />
          </>
        ) : (
          <>
            <div className={`App ${isDark ? 'theme-dark' : ''}`}>
              <Header showModal={this.showModal}>
                <div className='role'>{formName}</div>
                <ButtonWithIcon className='settings' showModal={this.showModal}>
                  <i className='fa fa-cogs' />
                </ButtonWithIcon>
              </Header>
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
