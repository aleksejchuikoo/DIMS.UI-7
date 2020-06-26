import React, { useState, useEffect } from 'react';
import './App.sass';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import HeaderModal from './components/Header/Modal/Modal';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, openModal] = useState(false);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('theme-color');

    if (currentThemeColor === 'theme-dark') {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const handleSwitchColor = () => {
    if (isDark) {
      localStorage.setItem('theme-color', 'theme-light');
      setIsDark(false);
    } else {
      localStorage.setItem('theme-color', 'theme-dark');
      setIsDark(true);
    }
  };

  const showModal = () => {
    if (isOpen) {
      openModal(false);
    } else {
      openModal(true);
    }
  };

  return (
    <BrowserRouter>
      <div className={`App ${isDark ? 'theme-dark' : ''}`}>
        <Header showModal={showModal} />
        <Content />
        <Footer />
      </div>
      <HeaderModal isOpen={isOpen} isDark={isDark} handleButton={showModal} handleChechbox={handleSwitchColor} />
    </BrowserRouter>
  );
};

export default App;
