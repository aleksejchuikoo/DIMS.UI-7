import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAylMDCnyy_PXciLhGjZWAOv7nfQRHojaY',
  authDomain: 'dims-ui.firebaseapp.com',
  databaseURL: 'https://dims-ui.firebaseio.com',
  projectId: 'dims-ui',
  storageBucket: 'dims-ui.appspot.com',
  messagingSenderId: '223649312792',
  appId: '1:223649312792:web:b69247d72716e2d028936d',
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
