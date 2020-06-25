import React from 'react';
import './App.sass';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import HeaderModal from './components/Header/Modal/Modal';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Content />
        <Footer />
      </div>
      <HeaderModal />
    </BrowserRouter>
  );
};

export default App;
