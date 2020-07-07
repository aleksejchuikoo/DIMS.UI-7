import React, { Component } from 'react';
import './App.sass';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import HeaderModal from './components/Header/Modal/Modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDark: false,
      isOpen: false,
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

  render() {
    const { isOpen, isDark } = this.state;
    return (
      <BrowserRouter>
        <div className={`App ${isDark ? 'theme-dark' : ''}`}>
          <Header showModal={this.showModal} />
          <Content />
          <Footer />
        </div>
        <HeaderModal
          isOpen={isOpen}
          isDark={isDark}
          handleButton={this.showModal}
          handleCheckbox={this.handleSwitchColor}
        />
      </BrowserRouter>
    );
  }
}

export default App;
